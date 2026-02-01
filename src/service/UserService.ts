import UserRest from '@/rest/UserRest.ts';
import type { LoginRequest, RegisterRequest, UpdateUserRequest, UpdatePasswordRequest } from '@/types/user-types.d.ts';
import { name as ChatRoute} from '@pages/chat';
import { name as LoginRoute} from '@pages/sign-in';
import { fixAvatarUrls, handleHttpError } from '@utils/HttpUtils';
import { Input } from '@components/general';

const userRest = new UserRest();

export const login = async (data: LoginRequest) => {
    try {
        const result = await userRest.login(data);
        if (result.status === 200)
            window.router.go(window.router.getPath(ChatRoute));
        else {
            handleHttpError(result, true);
        }
    } catch (err: unknown) {
        console.error(err);
    }
}

export const register = async (data: RegisterRequest) => {
    try {
        const result = await userRest.register(data);
        if (result.status === 200)
            window.router.go(window.router.getPath(ChatRoute));
        else
            handleHttpError(result, true);
    } catch (err) {
        console.error(err);
    }
}

export const me = async () => {
    try {
        const result = await userRest.me();
        if (result.status === 200) {
            window.store.set({ user: fixAvatarUrls(JSON.parse(result.response)) });
            return true;
        } else
            handleHttpError(result, false);
    } catch (err) {
        console.error(err);
    }
    return false;
}

export const logout = async () => {
    try {
        const result = await userRest.logout();
        if (result.status === 200) {
            window.router.go(window.router.getPath(LoginRoute));
            window.store.set({});
        } else
            handleHttpError(result, true);
    } catch (err) {
        console.error(err);
    }
}

export const updateUserProfile = async (data: UpdateUserRequest) => {
    try {
        const result = await userRest.change(data);
        if (result.status === 200) {
            me();
        } else
            handleHttpError(result, true);
    } catch (err) {
        console.error(err);
    }
}

export const updateUserPassword = async (data: UpdatePasswordRequest) => {
    try {
        const result = await userRest.changePassword(data);
        if (result.status === 200) {
            me();
        } else
            handleHttpError(result, true);
    } catch (err) {
        console.error(err);
    }
}

export const updateProfileAvatar = async (input: Input) => {
    let choosedFile = input.getInput()!.files?.[0];
    console.log(choosedFile);
    if (choosedFile) {
        const resp = await userRest.updateProfileAvatar(choosedFile);
        if (resp.status === 200) {
            console.log('Step 2');
            console.log(choosedFile);
            return me()
        } else
            handleHttpError(resp, true);
    }
}

export const validateSession = async (successRoute: string, errorRoute?: string) => {
    if (await me())
        window.router.go(window.router.getPath(successRoute));
    else
        window.router.go(window.router.getPath(errorRoute ? errorRoute : LoginRoute));
}
