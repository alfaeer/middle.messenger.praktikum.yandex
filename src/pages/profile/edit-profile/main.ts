import './edit-profile.css';

import { Button, Input } from '@/components/general';
import * as RegexValidations from '@/utils/ProfileFieldsValidation';
import Block from '@framework/Block.ts';
import * as RegexValidation from '@utils/ProfileFieldsValidation';
import { ProfilePage, ViewProfile } from '@pages/profile';
import { connect } from '@framework/Store.ts';
import * as userService from '@service/UserService.ts';
import type { StoreStateObject } from '@/types/store-state-object';

class EditProfile extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,

            title: 'Редактирование',

            EmailInput: new Input({
                id: 'email',
                label: 'Почта',
                regex: RegexValidations.emailRegex,
                value: props.email
            }),
            LoginInput: new Input({
                id: 'login',
                label: 'Логин',
                regex: RegexValidations.loginRegex,
                value: props.login
            }),
            FirstNameInput: new Input({
                id: 'first_name',
                label: 'Имя',
                regex: RegexValidations.namesRegex,
                value: props.first_name
            }),
            SecondNameInput: new Input({
                id: 'second_name',
                label: 'Фамилия',
                regex: RegexValidations.namesRegex,
                value: props.second_name
            }),
            DisplayNameInput: new Input({
                id: 'display_name',
                label: 'Имя в чате',
                regex: RegexValidations.namesRegex,
                value: props.display_name
            }),
            PhoneInput: new Input({
                id: 'phone',
                label: 'Телефон',
                regex: RegexValidations.phoneRegex,
                value: props.phone
            }),

            SaveEditButton: new Button({
                id: 'profile-edit-save',
                label: 'Сохранить',
                class: 'primary',
            }),
            events: {
                submit: (e: Event) => {
                    if (RegexValidation.validateAndLogin(this, e)) {
                        userService.updateUserProfile({
                            first_name: (this.children.FirstNameInput as Input).getInputValue(),
                            second_name: (this.children.SecondNameInput as Input).getInputValue(),
                            display_name: (this.children.DisplayNameInput as Input).getInputValue(),
                            login: (this.children.LoginInput as Input).getInputValue(),
                            email: (this.children.EmailInput as Input).getInputValue(),
                            phone: (this.children.PhoneInput as Input).getInputValue()
                        })
                        const viewProfile = new ViewProfile({});
                        this.getElement()?.replaceWith(viewProfile.getContent());
                        }
                }
            }
        });
    }

    override componentDidMount() {
        userService.validateSession(ProfilePage.name, this.constructor.name);
    }

    override render() {
        return `
            <div class="edit-profile-container">
                <main class="main-container">
                    <form id="edit-profile-form" method="post">
                        {{{ EmailInput }}}
                        {{{ LoginInput }}}
                        {{{ FirstNameInput }}}
                        {{{ SecondNameInput }}}
                        {{{ DisplayNameInput }}}
                        {{{ PhoneInput }}}
                        <div class="buttons-container">
                            {{{ SaveEditButton }}}
                        </div>
                    </form>
                </main>
            </div>
        `;
    }
}

const storeMapper = (state: StoreStateObject)=> {
    return {
        ...state.user,
    }
}

export default connect(storeMapper)(EditProfile);
