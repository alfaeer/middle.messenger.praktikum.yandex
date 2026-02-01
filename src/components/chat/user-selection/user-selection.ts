import Block from '@framework/Block.ts';
import { Avatar, Input } from '@components/general';
import { UserField } from '@components/chat/user-field';

export default class UserSelection extends Block {
    private inputTimeout: number = -1;

    private defaultUserList?: UserDataType[];

    constructor(props: BlockProps) {
        super({
            ...props,

            Input: new Input({
                chatId: props.chatId,
                id: props.inputId,
                placeholder: 'Введите символы, чтобы отфильтровать юзеров',
                events: {
                    keyup: () => {
                        clearTimeout(this.inputTimeout);
                        this.inputTimeout = setTimeout(() => {
                            this.updateUserList();
                        }, 500)
                    }
                }
            })
        });
    }

    override componentDidMount() {
        this.updateUserList();
    }

    private filterResults(value: string) {
        if (this.defaultUserList)
            return this.defaultUserList.filter((item) =>
                (item.first_name ? item.first_name.toLowerCase().indexOf(value.toLowerCase()) >= 0 : false) ||
                (item.second_name ? item.second_name.toLowerCase().indexOf(value.toLowerCase()) >= 0 : false) ||
                (item.email ? item.email.toLowerCase().indexOf(value.toLowerCase()) >= 0 : false) ||
                (item.display_name ? item.display_name.toLowerCase().indexOf(value.toLowerCase()) >= 0 : false)
            );
        return [];
    }

    public updateUserList() {
        let value = (this.children.Input as Input).getInputValue();
        if (this.defaultUserList && this.props.useAsFilter) {
            let filteredUsers = this.filterResults(value);
            let userComponents = this.convertUsersToUsersComponent(filteredUsers);
            this.setProps({ users: userComponents });
        } else
            this.props.searchFunction(value).then((users: UserDataType[]) => {
                this.defaultUserList = users;
                let userComponents = this.convertUsersToUsersComponent(users);
                this.setProps({ users: userComponents });
            });
    }

    public convertUsersToUsersComponent(users: UserDataType[]) {
        return users.reduce((acc: UserField[], val) => {
            acc.push(new UserField({
                ...val,

                Avatar: new Avatar({
                    url: val.avatar
                })
            }));
            return acc;
        }, []);
    }

    override render() {
        return `
            <div class="user-selection" id="{{selectionName}}">
                <div class="user-selection-header">
                    <!--<input type="text" class="user-search-input" placeholder="Введите символы, чтобы найти юзеров">-->
                    {{{ Input }}}
                </div>
                <div class="user-selection-results">
                    <div class="user-selection-result-container">
                        {{#if users}}
                            {{{ users }}}
                        {{else}}
                            Юзеры не найдены
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}
