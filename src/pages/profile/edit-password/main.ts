import Block from '@framework/Block.ts';
import { Button, Input } from '@components/general';
import { ViewProfile } from '@pages/profile';

import * as RegexValidation from '@utils/ProfileFieldsValidation';
import * as FakeData from '@utils/FakeData';

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
                    onFormSubmit(e, this);
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

function onFormSubmit(e: Event, context: Block) {
    if (RegexValidation.validatePasswordChange(context, e)) {
        const viewProfile = new ViewProfile({
            ...FakeData.getProfileData()
        });
        context.getElement()?.replaceWith(viewProfile.getContent());
    }
}
