import Block from '@framework/Block.ts';
import { Button, Input } from '@components/general';
import { ViewProfile } from '@pages/profile';
import * as userService from '@service/UserService.ts';

import * as RegexValidation from '@utils/ProfileFieldsValidation';

export default class EditPassword extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,

            OldPasswordInput: new Input({
                id: 'oldPassword',
                label: 'Старый пароль',
                regex: RegexValidation.noneEmptyRegex,
                type: 'password'
            }),
            NewPasswordInput: new Input({
                id: 'newPassword',
                label: 'Новый пароль',
                regex: RegexValidation.passwordRegex,
                type: 'password'
            }),
            ConfirmPasswordInput: new Input({
                id: 'newPassword',
                label: 'Повторите пароль',
                regex: RegexValidation.passwordRegex,
                type: 'password'
            }),

            SaveEditButton: new Button({
                id: 'password-edit-save',
                label: 'Сохранить',
                class: 'primary',
            }),
            events: {
                submit: (e: Event) => {
                    if (RegexValidation.validatePasswordChange(this, e)) {
                        userService.updateUserPassword({
                            oldPassword: (this.children.OldPasswordInput as Input).getInputValue(),
                            newPassword: (this.children.NewPasswordInput as Input).getInputValue(),
                        });
                        const viewProfile = new ViewProfile({});
                        this.getElement()?.replaceWith(viewProfile.getContent());
                    }
                }
            }
        });
    }

    override render() {
        return `
            <div class="edit-password-container">
                <main class="main-container">
                    <form id="edit-password-form" method="post">
                        {{{ OldPasswordInput }}}
                        {{{ NewPasswordInput }}}
                        {{{ ConfirmPasswordInput }}}
                        <div class="buttons-container">
                            {{{ SaveEditButton }}}
                        </div>
                    </form>
                </main>
            </div>
        `;
    }
}
