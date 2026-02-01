import './sign-up.css';
import '@pages/styles.css';

import Block from '@framework/Block.ts';
import { Button, Input, Link } from '@components/general';
import * as RegexValidations from '@utils/ProfileFieldsValidation';
import * as userService from '@service/UserService.ts';
import { name as RouteName } from '@pages/sign-in'
import { ChatPage } from '@pages/chat';

export default class SignUpPage extends Block {
    constructor() {
        super({
            title: 'Регистрация',
            doctitle: 'Регистрация',

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
            SignInLink: new Link({
                id: 'sign-in',
                label: 'Войти',
                class: 'button link',
                link: window.router.getPath(RouteName),
            }),
            events: {
                submit: (e: Event) => {
                    if (RegexValidations.validateAndLogin(this, e)) {
                        userService.register({
                            first_name: (this.children.FirstNameInput as Input).getInputValue(),
                            second_name: (this.children.SecondNameInput as Input).getInputValue(),
                            login: (this.children.LoginInput as Input).getInputValue(),
                            password: (this.children.PasswordInput as Input).getInputValue(),
                            email: (this.children.EmailInput as Input).getInputValue(),
                            phone: (this.children.PhoneInput as Input).getInputValue(),
                        })
                    }
                }
            }
        });
    }

    override componentDidMount() {
        userService.validateSession(ChatPage.name, this.constructor.name);
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
                        {{{ SignInLink }}}
                    </form>           
                </div> 
            </div>
        `;
    }
}
