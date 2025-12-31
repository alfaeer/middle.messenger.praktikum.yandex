import './edit-profile.css';

import { Button, Input } from '@/components/general';
import * as RegexValidations from '@/utils/ProfileFieldsValidation';
import Block from '@framework/Block.ts';
import * as RegexValidation from '@utils/ProfileFieldsValidation';
import { ViewProfile } from '@pages/profile';
import * as FakeData from '@utils/FakeData';

export default class EditProfile extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,

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
                    onFormSubmit(e, this);
                }
            }
        });
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

function onFormSubmit(e: Event, context: Block) {
    if (RegexValidation.validateAndLogin(context, e)) {
        const viewProfile = new ViewProfile({
            ...FakeData.getProfileData()
        });
        context.getElement()?.replaceWith(viewProfile.getContent());
    }
}
