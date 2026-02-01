import '@pages/styles.css';
import './error500.css';

import Block from '@framework/Block.ts';
import { Button } from '@components/general/button';
import * as userService from '@service/UserService.ts';

export default class Error500 extends Block {
    constructor() {
        super({
            title: 'Ошибка 500',

            BackButton: new Button({
                id: 'back',
                label: 'Назад',
                class: 'link',
                events: {
                    click: () => {
                        window.router.back()
                    }
                }
            }),
        });
    }

    override componentDidMount() {
        userService.validateSession(this.constructor.name);
    }

    override render() {
        return `
            <div class="form-container">
                <div class="error-header">
                    <h1 class="title">{{title}}</h1>
                </div>
                <div class="error-body">
                    <span>Мы уже фиксим</span>
                </div>
                <div id="error500-form-btn" class="error500-form-btn">
                    {{{ BackButton }}}
                </div>
            </div> 
        `;
    }
}
