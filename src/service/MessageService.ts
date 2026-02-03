import ChatWebsocket from '@rest/ChatWebsocket.ts';
import ChatService from '@service/ChatService.ts';

export default class MessageService {
    private chatService!: ChatService;
    private chatSocket!: ChatWebsocket;

    private chatId!: number;

    private static __instance: MessageService;

    constructor() {
        if (MessageService.__instance) {
            return MessageService.__instance;
        }

        this.chatService = new ChatService();

        MessageService.__instance = this;
    }

    public async initSocket(chatId: number, unreadMessages?: MessageDataType[]) {
        this.stopSocket();

        this.chatId = chatId;

        await this.startSocket(unreadMessages);
    }

    public isLoggedInUserMessage(message: MessageDataType) {
        return message.user_id ? message.user_id === window.store.get().user?.id :
            message.user ? message.user.login = window.store.get().user?.login : false;
    }

    public async startSocket(unreadMessages?: MessageDataType[]) {
        const token = await this.chatService.getWebsocketToken(this.chatId)
        this.chatSocket = new ChatWebsocket(this.chatId, token, unreadMessages);
    }

    public stopSocket() {
        this.chatSocket?.destroy();
    }

    public getOldMessages(): void {
        console.log('trying to get OldMessages');
        this.chatService.getUnreadMessageCount(this.chatId).then(count => {
            console.log('getUnreadMessages count = ', count);
            // anyway get first portion of old messages
            // if count of unread messages more than 20 will be asked next portions of messages
            this.chatSocket.getMessages();
            let offset = 20;
            while (offset < count) {
                console.log(`trying to get portion with offset = ${offset}`);
                console.log(this)
                this.chatSocket.getMessages(offset)
                offset += 20;
            }
        });
    }

    public sendMessage(message: string): void {
        this.chatSocket.sendMessage(message);
    }
}
