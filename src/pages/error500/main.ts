import '@pages/styles.css';
import './error500.css';

import Block from '@framework/Block.ts';
import { Button } from '@components/general/button';

export default class Error500 extends Block {
    constructor() {
        super({
            title: 'Ошибка 500',

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
                <div class="error500-body">
                    <span>Мы уже фиксим</span>
                </div>
                <div id="error500-form-btn" class="error500-form-btn">
                    {{{ BackButton }}}
                </div>
            </div> 
        `;
    }
}

const page = new Error500();
document.getElementById('app')?.replaceWith(page.getContent());
