import type { UserDataType } from '@/types/user-data-type.d.ts';

interface LoadableChatConfig {
    chatId: number;
    title: string;
    avatar: string;
    users: UserDataType[];
}

interface EditableChatConfig {
    chatId: number;
    changes: FieldConfigChange;
}

/*export const ChangeKeysEnum = {
    TITLE: 'title',
    AVATAR: 'avatar',
    USERS: 'users'
} as const;*/

export type FieldConfigChange = {
    // [key: typeof ChangeKeysEnum[keyof typeof ChangeKeysEnum]]: {
    [key: string]: {
        from: unknown;
        to: unknown;
    }
}
