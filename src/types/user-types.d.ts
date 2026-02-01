
export type LoginRequest = {
    login: string;
    password: string;
}

export type RegisterRequest = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export type UpdateUserRequest = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export type UpdatePasswordRequest = {
    oldPassword: string,
    newPassword: string
}
