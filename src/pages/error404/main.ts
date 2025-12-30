import '@pages/styles.css';
import './error404.css';

import Block from '@framework/Block.ts';
import { Button } from '@components/general/button';

export default class Error404 extends Block {
    constructor() {
        super({
            title: 'Ошибка 404',

            BackButton: new Button({
                id: 'back',
                label: 'Назад к чатам',
                class: 'link',
            }),
        });
    }

    override render() {
        return `
            <div class="form-container">
                <div class= "header">
                    <h1 class="title">{{title}}</h1>
                </div>
                <div class="error404-body">
                    <span>Вы ошиблись адресом</span>
                </div>
                <div id="error404-form-btn" class="error404-form-btn">
                    {{{ BackButton }}}
                </div>
            </div> 
        `;
    }
}

const page = new Error404();
document.getElementById('app')?.replaceWith(page.getContent());
