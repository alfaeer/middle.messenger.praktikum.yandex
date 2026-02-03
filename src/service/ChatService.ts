import ChatRest from '@rest/ChatRest.ts';
import { LoginPage } from '@pages/sign-in';
import { Error500 } from '@pages/error500';
import { fixAvatarUrls, handleHttpError } from '@utils/HttpUtils';

export default class ChatService {
    private chatRest!: ChatRest;
    private store;

    private timeout = 30000;
    private timeoutFunc?: number;

    private offset = 0;
    private limit = 10;
    private maxResults = this.limit;
    private filter = '';

    private static __instance: ChatService;

    constructor() {
        if (ChatService.__instance)
            return ChatService.__instance;

        this.chatRest = new ChatRest();
        this.store = window.store;
        this.configureChatRequests();

        ChatService.__instance = this;
    }

    public configureChatRequests(filter?: string) {
        this.setChatRequestParams(0, this.limit, this.limit, filter || '');
        this.store.setValue('chat', {});

        console.log(window.store.state);
    }

    private setChatRequestParams(offset: number, limit: number, maxResults: number, filter: string) {
        this.offset = offset;
        this.limit = limit;
        this.maxResults = maxResults;
        this.filter = filter;
        this.store.setValue('chat.config', { offset: this.offset, limit: this.limit, filter: this.filter });
    }

    private async getChatResp(offset: number, limit: number, filter: string) {
        const resp = await this.chatRest.getChats(offset, limit, filter);
        if (resp.status === 200) {
            return JSON.parse(resp.responseText) as ChatDataType[];
        } else if (resp.status === 401) {
            window.router.go(window.router.getPath(LoginPage.name));
        } else if (resp.status === 500) {
            window.router.go(window.router.getPath(Error500.name));
        } else {
            throw new Error(handleHttpError(resp, true));
        }
    }

    private fixNullValuesForChats(chats: ChatDataType[]) {
        const selectedChat = this.store.get().chat.selectedChat;
        chats.forEach(chat => {
            if (!chat.last_message)
                chat.last_message = { content : 'У вас еще нет сообщений' }
            else if (chat.last_message.content.length > 60)
                chat.last_message.content = chat.last_message.content.substring(0, 60) + '...';

            chat.selected = selectedChat && selectedChat.id === chat.id
        })
        chats = fixAvatarUrls(chats) as ChatDataType[];
        return chats;
    }

    public async getChats(nextPortions: boolean = false) {
        let portion = 0;
        let offset = 0;
        let data: ChatDataType[] = [];
        let hasError = false;
        while (portion < this.maxResults && !hasError) {
            try {
                const resp = await this.getChatResp(offset, this.limit, this.filter) as ChatDataType[];
                data.push(...this.fixNullValuesForChats(resp).values());

                offset += this.limit;
                portion += this.limit;
            } catch (error) {
                hasError = true;
            }
        }
        if (nextPortions && !hasError) {
            try {
                const resp = await this.getChatResp(offset, this.limit, this.filter) as ChatDataType[];
                data.push(...this.fixNullValuesForChats(resp).values());

                this.maxResults += this.limit;
            } catch (error) {}
        }
        this.store.setValue('chat.chats', data);
    }

    public startUpdateChatsByTimeout() {
        this.timeoutFunc = setInterval(() => this.getChats(false), this.timeout);
    }

    public stopUpdateChatsByTimeout() {
        if (this.timeoutFunc)
            clearInterval(this.timeoutFunc);
    }

    public selectChat(chatId: number) {
        const foundChat = chatId != -1 ? this.store.get().chat.chats.find((chat: ChatDataType) => chat.id === chatId) : null;
        this.store.setValue("chat.selectedChat", foundChat);
        const fixedChats = this.fixNullValuesForChats(this.store.get().chat.chats);
        this.store.setValue('chat.chats', fixedChats);
    }

    public async createNewChat(name: string) {
        console.debug('createNewChat started');

        const resp = await this.chatRest.createChat(name);
        if (resp.status === 200) {
            const data = JSON.parse(resp.responseText);
            this.getChats(false);

            console.debug('createNewChat created = ', data.id);
            return data.id;
        } else if (resp.status === 400) {
            console.error(handleHttpError(resp, true));
        } else if (resp.status === 401) {
            window.router.go(window.router.getPath(LoginPage.name));
        } else if (resp.status === 500) {
            window.router.go(window.router.getPath(Error500.name));
        } else {
            throw new Error(handleHttpError(resp, true));
        }
        console.debug('createNewChat failed');
        return null;
    }

    public async getWebsocketToken(chatId: number) {
        const resp = await this.chatRest.getWebsocketToken(chatId);
        if (resp.status === 200) {
            return JSON.parse(resp.responseText).token;
        } else
            return {};
    }

    public async getUnreadMessageCount(chatId: number) {
        const resp = await this.chatRest.getUnreadMessageCount(chatId);
        if (resp.status === 200) {
            return JSON.parse(resp.responseText).unread_count;
        } else {
            console.log('cannot get unread message count');
            return -1;
        }
    }
}
