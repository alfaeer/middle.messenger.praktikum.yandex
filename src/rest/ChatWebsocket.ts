
export default class ChatWebsocket {

    private chatId: number;
    private token: string;
    private userId: number;
    private socket: WebSocket | null;

    private pingPongTimer?: number;
    private retries: number = 0;
    private maxRetries = 5;

    constructor(chatId: number, token: string, unreadMessage: MessageDataType[] = []) {
        this.chatId = chatId;
        this.token = token;

        this.userId = window.store.get().user?.id;
        window.store.setValue('chat.messages', unreadMessage);

        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`);

        this.initWebsocket();

        return this;
    }

    public isConnected(): boolean {
        return (this.socket !== null && this.socket !== undefined && this.socket.readyState === WebSocket.OPEN);
    }

    private startPingPong() {
        this.stopPingPong();

        this.pingPongTimer = setInterval(() => {
            this.pingPong();
        }, 30000);
    }

    private stopPingPong() {
        if (this.pingPongTimer)
            clearInterval(this.pingPongTimer);
    }

    public destroy() {
        if (this.socket) {
            this.stopPingPong();
            if (this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING)
                this.socket.close();
            this.socket = null;
        }
    }

    private initWebsocket() {
        if (!this.socket)
            return;

        this.socket.addEventListener('open', () => {
            console.log('websocket opened', this.socket);

            this.retries = 0;
            // this.waitConnection();
            this.startPingPong();
        });

        this.socket.addEventListener('close', (event) => {
            if (event.wasClean) {
                console.log('websocket closed');
            } else {
                console.log('websocket unexpected closed');
            }
            this.stopPingPong();
        });

        this.socket.addEventListener('message', (event) => {
            console.log('websocket message', event.data);
            this.parseAnswer(event.data);
        });

        this.socket.addEventListener('error', (event) => {
            // Не смог найти правильный класс ивента. В документации написано, что это Generic Event, который
            // не содержит поля message, но в примере от ЯПрактикум в случае ошибки использовался именно event.message
            // @ts-ignore
            console.log('websocket error', event.message);

            this.stopPingPong();

            if (this.retries < this.maxRetries) {
                this.retries++;
                console.log('trying to reconnect, attempt = ', this.retries);
                this.initWebsocket();
            } else {
                // the same as 10 rows above
                // @ts-ignore
                console.error(`Cannot connect to websocket after ${this.maxRetries} attempts,`, event.message);
                alert(`Не удалось установить соединение с вебсокетом спустя ${this.maxRetries} попыток. Попробуйте обновить страничку`);
            }
        });
    };

    public send(content: WebsocketRequest): void {
        console.log('websocket send', content);
        const string = JSON.stringify(content);

        let retries = 0;
        let timer = setInterval(() => {
            console.log(`retry ${retries}`, this);
            if (retries < this.maxRetries) {
                if (this.isConnected()) {
                    clearInterval(timer);
                    this.socket!.send(string);
                }
            } else {
                clearInterval(timer);
                throw new Error('Websocket is not connected');
            }
            retries++;
        }, 1000);
        // this.socket?.send(string);
    }

    public parseAnswer(data: string) {
        const response = JSON.parse(data);
        console.log('socket answer', response);
        if (response instanceof Array) {
            const prevMessages = window.store.get().chat.messages;
            const newMessages = [...response, ...prevMessages];
            window.store.setValue('chat.messages', newMessages);
        } else {
            if (response.type === 'message') {
                console.log('socket message', response);
                const prevMessages = window.store.get().chat.messages;
                console.log('prevMessages', prevMessages);

                const newMessages = [response, ...prevMessages];
                console.log('newMessages', newMessages);

                window.store.setValue('chat.messages', newMessages);
            }
        }
    }

    public sendMessage(message: string): void {
        const string = { content: message, type: 'message' };
        this.send(string);
    }

    public getMessages(offset: number = 0) {
        const string = { type: 'get old', content: offset.toString() };
        this.send(string);
    }

    private pingPong() {
        this.send({ type: 'ping' });
    }
}
