import './dialog-container.css';
import Block from '@framework/Block.ts';
import { Button } from '@components/general';

export default class DialogContainer extends Block {
    constructor(props: BlockProps) {
        console.log('dialog initialized');
        super({
            ...props,

            CloseButton: new Button({
                id: 'close',
                class: 'link',
                label: 'Close',
                events: {
                    click: () => {
                        super.getContent().remove();
                    }
                }
            })
        });
    }

    override show() {
        (this.getContent() as HTMLDialogElement).showModal();
        if (this.children)
            Object.values(this.children).forEach((child) => { child!.show(); });
    }

    override hide() {
        this.getContent().remove();
    }

    override render(): string {
        return `
            <dialog id="{{id}}" class="custom-dialog">
                <div class="modal-header">
                    <h2>{{ title }}</h2>
                </div>
                <div class="modal-content">
                    {{ content }}
                </div>
                <div class="modal-footer">
                    <div class="buttons-container">
                        {{#if buttons}}
                            {{{ buttons }}}
                        {{/if}}
                        {{{ CloseButton }}}
                    </div>
                </div>
            </dialog >
        `.replace('{{ content }}', this.props.content);
    }
}
