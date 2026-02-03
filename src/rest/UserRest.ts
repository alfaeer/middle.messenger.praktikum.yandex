import HttpClient from '@framework/HttpClient.ts';
import type { LoginRequest, RegisterRequest, UpdatePasswordRequest, UpdateUserRequest } from '@/types/user-types';

export default class UserRest {
    private httpClient = new HttpClient("");

    private headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    private constructParams(data: CustomObject) {
        return {
            data: JSON.stringify(data),
            headers: this.headers
        }
    }

    async login(data: LoginRequest) {
        return this.httpClient.post("/auth/signin", this.constructParams(data));
    }

    async register(data: RegisterRequest) {
        return this.httpClient.post("/auth/signup", this.constructParams(data));
    }

    async logout() {
        return this.httpClient.post("/auth/logout");
    }

    async me() {
        return this.httpClient.get("/auth/user");
    }

    async change(data: UpdateUserRequest) {
        return this.httpClient.put("/user/profile", this.constructParams(data))
    }

    async changePassword(data: UpdatePasswordRequest) {
        return this.httpClient.put("/user/password", this.constructParams(data))
    }

    async findAvailableUsers(login: string = '') {
        return this.httpClient.post('/user/search', this.constructParams({ login }));
    }

    async updateProfileAvatar(avatar: File) {
        let formData = new FormData();
        formData.append("avatar", avatar);
        return this.httpClient.put('/user/profile/avatar', { data: formData });
    }
}
