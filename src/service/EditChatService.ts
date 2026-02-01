import ChatRest from '@rest/ChatRest.ts';
import UserRest from '@rest/UserRest.ts';
import type { LoadableChatConfig } from '@/types/chat-config';
import { fixAvatarUrls, handleHttpError } from '@utils/HttpUtils';
import { Input } from '@components/general';

export default class EditChatService {
    private chatId: number;

    private chatRest: ChatRest;
    // private userRest: UserRest;

    constructor(chatId: number) {
        this.chatId = chatId;

        this.chatRest = new ChatRest();
        // this.userRest = new UserRest();
    }

    // because this function used as parameter, <this> will be linked to place, from this parameter executes
    // so this.chatRest will be undefined... actually any this.<variable> will be undefined
    public async getChatUsers(filter: string = '') {
        let chatRest = new ChatRest();

        let users: UserDataType[] = [];
        let hasError = false;
        let offset = 0;
        let limit = 10;

        let isFilterEmail = filter.indexOf('@') >= 0;
        let name = isFilterEmail ? '' : filter;
        let email = isFilterEmail ? filter : '';

        let portion: UserDataType[] = [];
        do {
            const response = await chatRest.getChatUsers(this.chatId, offset, limit, name, email);
            if (response.status === 200) {
                portion = fixAvatarUrls(JSON.parse(response.responseText)) as UserDataType[];
                users.push(...portion.values());
                offset += limit;
            } else {
                hasError = true;
                handleHttpError(response, true);
            }
        } while (!hasError && portion.length > 0);
        return users;
    }

    // because this function used as parameter, <this> will be linked to place, from this parameter executes
    // so this.userRest will be undefined... actually any this.<variable> will be undefined
    public async getAvailableUsers(login: string = '') {
        let userRest = new UserRest();
        const response = await userRest.findAvailableUsers(login);
        if (response.status === 200) {
            return fixAvatarUrls(JSON.parse(response.responseText));
        } else
            handleHttpError(response, true);
    }

    public async getFullChatConfig() {
        const selectedChat: ChatDataType = window.store.get().chat.selectedChat;
        if (!selectedChat || selectedChat.id !== this.chatId)
            throw new Error('Выбранный чат не соответствует загружаемым настройкам');

        let users: UserDataType[] = await this.getChatUsers();

        let config: LoadableChatConfig = {
            chatId: selectedChat.id,
            title: selectedChat.title,
            avatar: selectedChat.avatar,
            users: users,
        };

        return config;
    }

    public async updateChatUsers(currentUserIds: number[], newChatUserIds: number[]) {
        let usersToAdd = newChatUserIds.filter((user: number) => currentUserIds.findIndex(cur => cur === user) < 0);
        let usersToRemove = currentUserIds.filter((user: number) => newChatUserIds.findIndex(cur => cur === user) < 0);

        console.log(usersToAdd);
        console.log(usersToRemove);

        if (usersToAdd.length > 0)
            await this.chatRest.addUsers(this.chatId, usersToAdd);
        if (usersToRemove.length > 0)
            await this.chatRest.removeUsers(this.chatId, usersToRemove);

        return this.getChatUsers();
    }

    public async updateAvatar(input: Input) {
        let choosedFile = input.getInput()!.files?.[0];
        if (choosedFile) {
            const resp = await this.chatRest.updateAvatar(this.chatId, choosedFile);
            if (resp.status === 200)
                return fixAvatarUrls(JSON.parse(resp.responseText)) as ChatDataType;
        }
        return null;
    }

    public async deleteChat() {
        this.chatRest.deleteChat(this.chatId);
    }
}
