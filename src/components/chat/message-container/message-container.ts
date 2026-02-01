import Block from '@framework/Block.ts';
import { Editor } from '@components/chat/editor';
import type { StoreStateObject } from '@/types/store-state-object';
import { connect } from '@framework/Store.ts';
import { Avatar, Button, DialogContainer } from '@components/general';
import ChatService from '@service/ChatService.ts';
import EditChatDialog from '@components/chat/edit-chat-dialog/edit-chat-dialog.ts';
import ChatWebsocket from '@rest/ChatWebsocket.ts';
import { MessageList } from '@components/chat/message-list';

class MessageContainer extends Block {
    private chatService = new ChatService();
    private websocket?: ChatWebsocket | null;

    constructor(props: BlockProps) {
        super({
            ...props,

            Editor: new Editor({
                id: props.id,
            }),
        });
    }

    override componentDidMount(): void {
        this.chatService = new ChatService();
    }

    private initMessageContainer(props: BlockProps) {
        console.log('initMessageContainer', props);

        let configuredProps: BlockProps = {
            title: props.title,
            selected: true,

            Avatar: new Avatar({
                url: props.avatar
            }),

            CloseChat: new Button({
                id: 'close-chat',
                placeholder: 'Закрыть',
                label: 'X',
                class: 'round redlink',
                events: {
                    click: () => {
                        this.chatService.selectChat(-1);
                    }
                }
            }),

            MessageList: new MessageList({
                ...props
            })
        }

        if (props.created_by === window.store.state.user.id) {
            configuredProps = Object.assign(configuredProps, {
                ChatSettings: new Button({
                    id: 'chat-settings',
                    placeholder: 'Настройки чата',
                    class: 'round link',
                    label: '☼',
                    events: {
                        click: () => {
                            const settingsDialog = new DialogContainer({
                                title: 'Настройки',
                                content: `{{{ EditChatDialog }}}`,

                                EditChatDialog: new EditChatDialog({
                                    ...props
                                }),

                                buttons: [
                                    // SubmitButton
                                    new Button({
                                        id: 'save-chat-changes-button',
                                        label: 'Сохранить',
                                        class: 'primary',
                                        placeholder: 'Сохранить настройки чата',
                                        events: {
                                            click: () => {
                                                (settingsDialog.getChildren().EditChatDialog as EditChatDialog).saveAllChanges();
                                            }
                                        }
                                    }),
                                    new Button({
                                        id: 'delete-chat-button',
                                        label: 'Удалить',
                                        placeholder: 'Удалить чат',
                                        class: 'redlink',
                                        events: {
                                            click: () => {
                                                (settingsDialog.getChildren().EditChatDialog as EditChatDialog).deleteChat();
                                            }
                                        }
                                    })
                                ]
                            })

                            console.log('append settingsDialog');
                            this.getContent().append(settingsDialog.getContent());
                            settingsDialog.show();
                        }
                    }
                }),
            })
        } else
            configuredProps.ChatSettings = null;

        return configuredProps;
    }

    private destroyMessageContainer() {
        this.websocket?.destroy();
        return {
            selected: false
        }
    }

    override setConnectedProps(props: BlockProps) {
        console.log('messageContainer setConnectedProps', props);
        if (props && Object.keys(props).length > 0) {
            const messageHeader = this.initMessageContainer(props);
            super.setProps({ ...messageHeader });
        } else {
            const noPropsHeader = this.destroyMessageContainer();
            super.setProps({ ...noPropsHeader });
        }
    }

    override render() {
        return `
            {{#if selected }}
            <div class="message-box-container" data-id="{{id}}">
                <div class="message-profile">
                    <div class="message-profile-info">
                        {{{ Avatar }}}
                        <div class="profile">
                            <h3>{{title}}</h3>
                        </div>
                        <div class="actions">
                            {{{ ChatSettings }}}
                            {{{ CloseChat }}}
                        </div>
                    </div>
                </div>
                <div class="messages-container">
                    {{{ MessageList }}}
                </div>
                <div class="message-input-container">
                    {{{ Editor }}}
                </div>
            </div>
            {{else}}
                <div class="message-no-selection">
                    Выберите чат
                </div>
            {{/if}}
        `;
    }
}

const storeMapper = (state: StoreStateObject) => {
    return {
        ...state.chat?.selectedChat
    };
};

export default connect(storeMapper)(MessageContainer);
