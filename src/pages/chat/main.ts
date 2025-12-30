import '@pages/styles.css';
import './chat.css';

import Block from '@framework/Block.ts';
import { ChatContainer } from '@components/chat/chat-container';

import * as FakeData from '@utils/FakeData';
import { ChatField } from '@components/chat/chat-field';
import { Avatar } from '@components/general';
import { MessageContainer } from '@components/chat/message-container';
import { MessageField } from '@components/chat/message-field';

export default class ChatPage extends Block {
    constructor() {
        super({

        });
    }

    override render() {
        return `
            <div class="chat">
                <aside class="chat-root-container">
                    <div class="chat-header">
                        <div class="my-profile">
                            <a href="/src/pages/profile/">Профиль ></a>
                        </div>
                        <div class="chat-search">
                            <div class="chat-search-box">
                                <div class="chat-search-input">
                                    <svg id="search-icon" width="20" height="20" viewBox="0 0 24 24">
                                        <path d="m21 21-4.34-4.34"></path>
                                        <circle cx="11" cy="11" r="8"></circle>
                                    </svg>
                                    <input id="chat-search-input" placeholder="Поиск">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="chat-box">
                        Чаты скоро загрузятся...
                    </div>
                </aside>
                <div class="divider"></div>
                <main class="message-root-container">
                    <div id="message-box">
                        Выберите чат, чтобы отправить сообщение
                    </div>
                </main>
            </div>
        `;
    }
}

const page = new ChatPage();
document.getElementById("app")?.replaceWith(page.getContent());

const chatContainer = new ChatContainer({});
document.getElementById("chat-box")?.replaceWith(chatContainer.getContent());
const messageContainer = new MessageContainer({});
document.getElementById("message-box")?.replaceWith(messageContainer.getContent());

const chatDataJson = FakeData.getChatList();
const chatData: Array<Block> = chatDataJson.reduce((acc: Array<Block>, val) => {
    acc.push(new ChatField({
        ...val,

        Avatar: new Avatar({
            url: val.avatar,
        })
    }));
    return acc;
}, []);
chatContainer.setData({
    chats: chatData
})

const messageDataJson = FakeData.getMessageList();
const messageData: Array<Block> = messageDataJson.reduce((acc: Array<Block>, val) => {
    acc.push(new MessageField({
        ...val,
    }));
    return acc;
}, []);
messageContainer.setProps({
    id: chatDataJson[0].id,
    profileName: chatDataJson[0].profileName,

    Avatar: new Avatar({
        url: chatDataJson[0].avatar
    })
});
messageContainer.setData({
    messages: messageData
})
