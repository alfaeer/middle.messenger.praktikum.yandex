import '@pages/styles.css';
import './error404.css';

import Block from '@framework/Block.ts';
import { Button } from '@components/general/';
import * as userService from '@service/UserService.ts';

export default class Error404 extends Block {
    constructor() {
        super({
            title: 'Ошибка 404',

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
                    <span>Вы ошиблись адресом</span>
                </div>
                <div id="error404-form-btn" class="error404-form-btn">
                    {{{ BackButton }}}
                </div>
            </div> 
        `;
    }
}
