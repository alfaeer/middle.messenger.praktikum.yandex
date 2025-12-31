import Block from '@framework/Block.ts';

export default class ChatContainer extends Block {
    constructor(props: BlockProps) {
        super({
            ...props
        });
    }

    override render() {
        return `
            <div class="chat-list-box">
                {{#if chats }}
                    {{{ chats }}}
                {{else}}
                    <p>У вас нет чатов</p>
                {{/if}}
            </div>
        `;
    }
}
