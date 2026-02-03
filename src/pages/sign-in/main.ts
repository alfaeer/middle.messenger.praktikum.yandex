import './sign-in.css';
import '@pages/styles.css';

import Block from '@framework/Block.ts';
import { Button, Input, Link } from '@components/general';
import * as RegexValidations from '@utils/ProfileFieldsValidation';
import * as userService from '@service/UserService.ts';
import { name as RouteName } from '@pages/sign-up';
import { ChatPage } from '@pages/chat';

export default class SignInPage extends Block {
    constructor() {
        super({
            title: 'Авторизация',
            doctitle: 'Авторизация',

            LoginInput: new Input({
                id: 'login',
                label: 'Логин',
                regex: RegexValidations.loginRegex,
            }),
            PasswordInput: new Input({
                id: 'password',
                label: 'Пароль',
                regex: RegexValidations.passwordRegex,
                type: 'password',
            }),
            SubmitButton: new Button({
                id: 'submit',
                label: 'Авторизоваться',
                class: 'primary',
                type: 'submit'
            }),
            SignUpLink: new Link({
                id: 'sign-up',
                label: 'Нет аккаунта?',
                class: 'button link',
                link: window.router.getPath(RouteName),
            }),
            events: {
                submit: (e: Event) => {
                    if (RegexValidations.validateAndLogin(this, e))
                        userService.login({
                            login: (this.children.LoginInput as Input).getInputValue(),
                            password: (this.children.PasswordInput as Input).getInputValue()
                        });
                }
            }
        });
    }

    override componentDidMount() {
        userService.validateSession(ChatPage.name);
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
                        {{{ SignUpLink }}}
                    </form>           
                </div> 
            </div>
        `;
    }
}
