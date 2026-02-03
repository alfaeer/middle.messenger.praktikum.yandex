
interface ChatDataType {
    id: number;
    title: string;
    avatar: string;
    created_by: number;
    unread_count: number;
    last_message: MessageDataType;
    selected: boolean;
}
