import Block from '@framework/Block.ts';

export default class MessageField extends Block {
    constructor(props: BlockProps) {
        super({
            ...props
        });
    }

    override render() {
        return `
            <div class="message-field-box {{#if userMessage}}user-message{{/if}}" data-id="{{id}}">
                <div class="message">
                    <div class="message-text">
                        {{text}}
                    </div>
                    <div class="message-data">
                        {{time}}
                    </div>
                </div>
            </div>
        `
    }
}
