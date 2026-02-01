import '@pages/styles.css';
import './chat.css';

import Block from '@framework/Block.ts';
import { ChatContainer } from '@components/chat/chat-container';
import { Button, DialogContainer, Input, Link } from '@components/general';
import { MessageContainer } from '@components/chat/message-container';
import { validateSession } from '@service/UserService';
import ChatService from '@service/ChatService.ts';

export default class ChatPage extends Block {
    chatService = new ChatService();

    constructor() {
        super({
            doctitle: 'Messenger',

            ProfileLink: new Link({
                id: 'profile-settings',
                link: '/settings',
                label: 'Профиль >'
            }),

            CreateChatButton: new Button({
                id: 'create-chat',
                label: '+',
                class: 'round',
                events: {
                    click: () => {
                        const dialog = new DialogContainer({
                            title: 'Создать чат',
                            content: '{{{ TitleInput }}}',

                            TitleInput: new Input({
                                id: 'title-input',
                                type: 'text',
                                placeholder: 'Введите имя чата',
                                label: 'Введите имя чата:'
                            }),

                            buttons: [
                                new Button({
                                    id: 'submit',
                                    type: 'submit',
                                    class: 'primary',
                                    label: 'Создать',
                                    events: {
                                        click: () => {
                                            console.log('modal click');
                                            console.log(this.children);
                                            this.chatService.createNewChat((dialog.getChildren().TitleInput as Input).getInputValue());
                                            dialog.hide();
                                        }
                                    }
                                })
                            ]
                        });

                        this.getContent().append(dialog.getContent());
                        dialog.show();
                    }
                }
            }),

            ChatContainer: new ChatContainer({}),

            MessageContainer: new MessageContainer({}),
        });
    }

    override componentDidMount() {
        validateSession(this.constructor.name);
    }

    /*override setProps(nextProps: BlockProps) {
        console.log('chat.setProps', nextProps);
        this.children.ChatContainer.setProps(nextProps);
        // super.setProps(nextProps);
    }*/

    override render() {
        return `
            <div class="chat">
                <aside class="chat-root-container">
                    <div class="chat-header">
                        <div class="my-profile">
                            {{{ ProfileLink }}}
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
                        {{{ ChatContainer }}}
                    </div>
                    <div class="chat-buttons-container">
                        {{{ CreateChatButton }}}    
                    </div>
                </aside>
                <div class="divider"></div>
                <main class="message-root-container">
                    <div id="message-box">
                        {{{ MessageContainer }}}
                    </div>
                </main>
            </div>
        `;
    }
}

/*const storeMapper = (state: StoreStateObject) => {
    return {
        ...state.chat
    }
}

export default connect(storeMapper)(ChatPage);*/

/*function getMessageData() {
    const messageDataJson = FakeData.getMessageList();
    return messageDataJson.reduce((acc: Array<Block>, val) => {
        acc.push(new MessageField({
            ...val,
        }));
        return acc;
    }, []);
}*/
