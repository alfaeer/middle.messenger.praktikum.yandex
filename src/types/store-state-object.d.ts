import type { ChatsStoreObject } from '@/types/chats-store-object';

interface StoreStateObject extends CustomObject {
    auth?: CustomObject,
    profile?: CustomObject,
    chat?: ChatsStoreObject,
    [key: string]: CustomObject
}
