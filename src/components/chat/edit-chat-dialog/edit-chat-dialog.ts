import './edit-chat-dialog.css'

import Block from '@framework/Block.ts';
import EditChatService from '@service/EditChatService.ts';
import { Avatar, Button, Input } from '@components/general';
import type { EditableChatConfig } from '@/types/chat-config';
import { UserSelection } from '@components/chat/user-selection';
import { UserField } from '@components/chat/user-field';

export default class EditChatDialog extends Block {
    private editChatService!: EditChatService;

    private changes: EditableChatConfig;

    private me!: UserDataType;
    private defaultChatUsers: number[] = [];
    private changedChatUsers: number[] = [];

    constructor(props: BlockProps) {
        console.log('test constructor init');

        super({
            ...props,

            chatId: props.id
        });

        this.changes = {
            chatId: props.id,
            changes: {}
        };

        this.editChatService = new EditChatService(this.props.chatId);
    }

    public getChanges() {
        return this.changes;
    }

    override componentDidMount() {
        this.me = window.store.state.user;
    }

    public deleteChat() {
        this.editChatService.deleteChat();
        let updatedChats = window.store.get().chat.chats.filter((chat: ChatDataType) => chat.id !== this.props.chatId);
        window.store.setValue('chat.selectedChat', null);
        window.store.setValue('chat.chats', updatedChats);
    }

    public validateUsersToAction(users: UserField[]) {
        return users.filter(user => this.me.id !== user.getProps().id);
    }

    public saveAllChanges() {
        console.log('start saving...', this.changes.changes);

        if (this.changes.changes.users)
            this.editChatService.updateChatUsers(this.changes.changes.users.from as number[], this.changes.changes.users.to as number[]).then(users => {
                console.log(users);
                let usersComponents = (this.children.ChatUserSelection as UserSelection).convertUsersToUsersComponent(users);
                this.children.ChatUserSelection!.setProps({ users: usersComponents });
            });
        if (this.changes.changes.avatar)
            this.editChatService.updateAvatar(this.getChildren().AvatarInputChange as Input).then((resp: ChatDataType | null) => {
                if (resp)
                    this.getChildren().Avatar!.setProps({ url: resp.avatar });
            })
    }

    public addUsersOnClick() {
        if (!this.getChildren().FoundUserSelection!.getData() || !this.getChildren().FoundUserSelection!.getData().users)
            return;

        let choosedUsers: UserField[] = Object.values(this.getChildren().FoundUserSelection!.getData()!.users!).filter((selection) => {
            if (selection instanceof UserField) {
                return selection.isSelected();
            }
        }) as UserField[];
        choosedUsers = this.validateUsersToAction(choosedUsers);

        let choosedUserIds: number[] = choosedUsers.reduce((acc: number[], val: UserField) => {
            acc.push(val.getProps().id);
            return acc;
        }, []);

        let currentUsers = this.getChildren().ChatUserSelection!.getData().users || [];
        this.getChildren().ChatUserSelection!.setData({ users: [...currentUsers, ...choosedUsers] });

        this.changedChatUsers.push(...choosedUserIds);

        this.changes.changes.users = {
            from: [...this.defaultChatUsers],
            to: [...this.changedChatUsers]
        }

        console.log('add users:');
        console.log('choosed users:', choosedUserIds);
        console.log('new list of users:', this.changedChatUsers);
        console.log('changes to proceed:', this.changes.changes);
    }

    public removeUsersOnClick() {
        if (!this.getChildren().ChatUserSelection!.getData() || !this.getChildren().ChatUserSelection!.getData().users)
            return;

        let choosedUsers: UserField[] = Object.values(this.getChildren().ChatUserSelection!.getData()!.users!).filter((selection) => {
            if (selection instanceof UserField) {
                return selection.isSelected();
            }
            return false;
        }) as UserField[];
        choosedUsers = this.validateUsersToAction(choosedUsers);

        let choosedUserIds: number[] = choosedUsers.reduce((acc: number[], val: UserField) => {
            acc.push(val.getProps().id);
            return acc;
        }, []);

        let currentUsers = this.getChildren().ChatUserSelection!.getData().users;
        currentUsers = currentUsers ? currentUsers.filter((user) => choosedUsers.findIndex(cur => cur === user) < 0) : [];
        this.getChildren().ChatUserSelection!.setData({ users: currentUsers });

        this.changedChatUsers = this.changedChatUsers.filter(user => choosedUserIds.findIndex(cur => cur === user) < 0);

        this.changes.changes.users = {
            from: [...this.defaultChatUsers],
            to: [...this.changedChatUsers]
        }

        console.log('remove users:');
        console.log('choosed users:', choosedUserIds);
        console.log('new list of users:', this.changedChatUsers);
        console.log('changes to proceed:', this.changes.changes);
    }

    private getDataAndShow() {
        console.log(`editChatService after init:`, this.editChatService);
        console.log(this);
        console.log('test before promise');
        // const config = {};
        // const config = await this.editChatService.getFullChatConfig();
        this.editChatService.getFullChatConfig().then((config) => {

            this.defaultChatUsers = config.users.reduce((acc: number[], user:UserDataType) => {
                acc.push(user.id);
                return acc;
            }, []);
            this.changedChatUsers = [...this.defaultChatUsers];

            this.setProps({
                TitleInputChange: new Input({
                    id: 'change-title',
                    label: 'Имя чата',
                    placeholder: 'Введите имя чата',
                    value: config.title,
                    description: 'На самом деле нет эндпоинта, чтобы изменить название чата :('
                }),
                AvatarInputChange: new Input({
                    id: 'change-avatar',
                    label: 'Выберите новый аватар',
                    type: 'file',
                    events: {
                        change: () => {
                            // @ts-ignore
                            this.changes.changes.avatar = {
                                from: config.avatar,
                                to: (this.children.AvatarInputChange as Input).getInputValue()
                            }
                        }
                    }
                }),
                Avatar: new Avatar({
                    id: 'chat-avatar',
                    url: config.avatar,
                    width: '128px',
                    height: '128px',
                }),

                ButtonAdd: new Button({
                    id: 'button-add-user',
                    class: 'round',
                    label: '<<',
                    events: {
                        click: () => {
                            this.addUsersOnClick();
                        }
                    }
                }),
                ButtonRemove: new Button({
                    id: 'button-remove-user',
                    class: 'round',
                    label: '>>',
                    events: {
                        click: () => {
                            this.removeUsersOnClick();
                        }
                    }
                }),

                ChatUserSelection: new UserSelection({
                    chatId: this.props.chatId,
                    inputId: 'chat-user-search-input',
                    selectionName: 'chat-user-search-selection',
                    searchFunction: this.editChatService.getChatUsers,
                    useAsFilter: true,
                }),
                FoundUserSelection: new UserSelection({
                    chatId: this.props.chatId,
                    inputId: 'available-user-search-input',
                    selectionName: 'available-user-search-selection',
                    searchFunction: this.editChatService.getAvailableUsers
                })
            });
        });
    }

    override show() {
        this.getDataAndShow();
        super.show();
    }

    override render(): string {
        return `
            <div class="settings-container" data-chat-id="{{chatId}}">
                <div class="settings-header">
                    <div class="chat-avatar-container">
                        {{{ Avatar }}}
                    </div>
                    <div class="chat-settings-change">
                        {{{ TitleInputChange }}}
                        {{{ AvatarInputChange }}}
                    </div>
                </div>
                <div class="settings-users">
                    <div class="chat-added-users settings-column user-selection-container">
                        {{{ ChatUserSelection }}}
                    </div>
                    <div class="chat-users-actions settings-column">
                        {{{ ButtonAdd }}}
                        {{{ ButtonRemove }}}
                    </div>
                    <div class="chat-available-users settings-column user-selection-container">
                        {{{ FoundUserSelection }}}
                    </div>
                </div>
            </div>
        `;
    }
}
