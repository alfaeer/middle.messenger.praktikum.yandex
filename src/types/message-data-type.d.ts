
interface MessageDataType {
    id?: number;
    user_id?: number;
    time?: string;
    content: string;
    type?: string;
    user?: UserDataType;
}
