import Block from '@framework/Block.ts';
import { Button } from '@components/general';
import MessageService from '@service/MessageService.ts';

export default class Editor extends Block {
    private messageService!: MessageService;

    constructor(props: BlockProps) {
        super({
            ...props,

            SendButton: new Button({
                id: 'message-send',
                class: 'primary round',
                type: 'submit',
                label: '➞'
            }),

            events: {
                submit: (e: Event) => {
                    this.onsubmitFunc(e);
                }
            }
        });
    }

    override componentDidMount() {
        this.messageService = new MessageService();
    }

    private onsubmitFunc(e: Event) {
        e.preventDefault();
        const inputElement = this.getElement()!.getElementsByTagName('input')[0];
        const value = inputElement.value;
        if (value) {
            if (this.messageService)
                this.messageService.sendMessage(value);

            inputElement.value = '';
        } else {
            console.log(`no message currently, nothing to do`);
        }
    }

    override render() {
        return `
            <div class="message-editor-container">
                <form class="message-form" method="POST" action="#" data-id="{{id}}">
                    <div id="message-attachments">
                    </div>
                    <div class="message-editor">
                        <input id="message" name="message" class="textarea" placeholder="Сообщение">
                    </div>
                    <div class="message-buttons">
                        {{{ SendButton }}}
                    </div>
                </form>
            </div>        
        `;
    }
}
