import HttpClient from '@framework/HttpClient.ts';

export default class ChatRest {
    private httpClient = new HttpClient("/chats");

    private headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    private constructParams(data: CustomObject) {
        return {
            data: JSON.stringify(data),
            headers: this.headers,
        }
    }

    async getChats(offset: number = 0, limit: number = 10, filter?: string ) {
        const params = {
            offset, limit, title: filter
        }
        return this.httpClient.get(`/`, { data: params });
    }

    async getWebsocketToken(chatId: number) {
        return this.httpClient.post(`/token/${chatId}`, this.constructParams({ chatId }));
    }

    async getUnreadMessageCount(chatId: number) {
        return this.httpClient.get(`/new/${chatId}`);
    }

    async createChat(name: string) {
        return this.httpClient.post(`/`, this.constructParams({ title: name }));
    }

    async getChatUsers(chatId: number, offset: number = 0, limit: number = 10, name: string = '', email: string = '') {
        const params = {
            offset, limit, name, email
        }
        return this.httpClient.get(`/${chatId}/users`, { data: params });
    }

    async addUsers(chatId: number, list: number[]) {
        const params = { chatId, users: list };
        return this.httpClient.put(`/users`, this.constructParams(params));
    }

    async removeUsers(chatId: number, list: number[]) {
        const params = { chatId, users: list };
        return this.httpClient.delete(`/users`, this.constructParams(params));
    }

    async updateAvatar(chatId: number, avatar: File) {
        let formData = new FormData();
        formData.append("chatId", chatId.toString());
        formData.append("avatar", avatar);
        return this.httpClient.put(`/avatar`, { data: formData });
    }

    async deleteChat(chatId: number) {
        return this.httpClient.delete(``, this.constructParams({ chatId }));
    }
}
