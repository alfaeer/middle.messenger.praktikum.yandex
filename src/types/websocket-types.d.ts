
interface WebsocketRequest {
    content?: string;
    type: string;
}

interface WebsocketResponse {
    chatId: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
}
