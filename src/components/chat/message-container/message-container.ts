import Block from '@framework/Block.ts';
import { Editor } from '@components/chat/editor';

export default class MessageContainer extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,

            Editor: new Editor({
                id: props.id
            }),
        });
    }

    override render() {
        return `
            <div class="message-box-container" data-id="{{id}}">
                <div class="message-profile">
                    <div class="message-profile-info">
                        {{{ Avatar }}}
                        <div class="profile">
                            <h3>{{profileName}}</h3>
                        </div>
                        <div class="actions">
                        </div>
                    </div>
                </div>
                <div class="messages-container">
                    <div class="message-list">
                        {{#if messages}}
                            {{{ messages }}}
                        {{else}}
                            <div class="message-no-messages">
                                <p>У вас еще нет сообщений с этим пользователем</p>
                            </div>
                        {{/if}}
                    </div>
                </div>
                <div class="message-input-container">
                    {{{ Editor }}}
                </div>
            </div>
        `
    }
}
