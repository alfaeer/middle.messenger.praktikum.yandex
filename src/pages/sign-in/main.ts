import './sign-in.css';
import '@pages/styles.css';

import Block from '@framework/Block.ts';
import { Button, Input } from '@components/general';
import * as RegexValidations from '@utils/ProfileFieldsValidation';

export default class SignInPage extends Block {
    constructor() {
        super({
            title: 'Авторизация',

            LoginInput: new Input({
                id: 'login',
                label: 'Логин',
                regex: RegexValidations.loginRegex
            }),
            PasswordInput: new Input({
                id: 'password',
                label: 'Пароль',
                regex: RegexValidations.passwordRegex,
                type: 'password'
            }),
            SubmitButton: new Button({
                id: 'submit',
                label: 'Авторизоваться',
                class: 'primary',
                type: 'submit'
            }),
            SignUpButton: new Button({
                id: 'sign-up',
                label: 'Нет аккаунта?',
                class: 'link'
            }),
            events: {
                submit: (e: Event) => {
                    RegexValidations.validateAndLogin(this, e);
                }
            }
        });
    }

    override render() {
        return `
            <div class="form-container">
                <div class="header">
                    <h2 class="title">{{title}}</h2>
                </div>
                <div class="body">
                    <form id="sign-in-form" method="post" 
                        class="sign-in-form" action="#">
                        {{{ LoginInput }}}
                        {{{ PasswordInput }}}
                        {{{ SubmitButton }}}
                        {{{ SignUpButton }}}
                    </form>           
                </div> 
            </div>
        `;
    }
}

const page = new SignInPage();
document.getElementById('app')?.replaceWith(page.getContent());
