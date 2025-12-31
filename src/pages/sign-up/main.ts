import './sign-up.css';
import '@pages/styles.css';

import Block from '@framework/Block.ts';
import { Button, Input } from '@components/general';
import * as RegexValidations from '@utils/ProfileFieldsValidation';

export default class SignInPage extends Block {
    constructor() {
        super({
            title: 'Регистрация',

            EmailInput: new Input({
                id: 'email',
                label: 'Почта',
                regex: RegexValidations.emailRegex
            }),
            LoginInput: new Input({
                id: 'login',
                label: 'Логин',
                regex: RegexValidations.loginRegex
            }),
            FirstNameInput: new Input({
                id: 'first_name',
                label: 'Имя',
                regex: RegexValidations.namesRegex
            }),
            SecondNameInput: new Input({
                id: 'second_name',
                label: 'Фамилия',
                regex: RegexValidations.namesRegex
            }),
            PhoneInput: new Input({
                id: 'phone',
                label: 'Телефон',
                regex: RegexValidations.phoneRegex
            }),
            PasswordInput: new Input({
                id: 'password',
                label: 'Пароль',
                regex: RegexValidations.passwordRegex,
                type: 'password',
            }),
            PasswordConfirmInput: new Input({
                id: 'password-confirm',
                label: 'Подтвердите пароль',
                regex: RegexValidations.passwordRegex,
                type: 'password'
            }),
            SubmitButton: new Button({
                id: 'submit',
                label: 'Зарегистрироваться',
                class: 'primary',
                type: 'submit'
            }),
            SignInButton: new Button({
                id: 'sign-in',
                label: 'Войти',
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
                        {{{ EmailInput }}}
                        {{{ LoginInput }}}
                        {{{ FirstNameInput }}}
                        {{{ SecondNameInput }}}
                        {{{ PhoneInput }}}
                        {{{ PasswordInput }}}
                        {{{ PasswordConfirmInput }}}
                        {{{ SubmitButton }}}
                        {{{ SignInButton }}}
                    </form>           
                </div> 
            </div>
        `;
    }
}

const page = new SignInPage();
document.getElementById('app')?.replaceWith(page.getContent());

