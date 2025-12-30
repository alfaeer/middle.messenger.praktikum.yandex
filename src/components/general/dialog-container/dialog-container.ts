import './dialog-container.css';
import Block from '@framework/Block.ts';

export default class DialogContainer extends Block {
    constructor(props: BlockProps) {
        super({
            ...props
        });
    }

    override render(): string {
        return `
            <dialog id="change-img-container" class="change-img-container">
                <div class="modal-content">
                    {{{ Dialog }}}
                </div>
            </dialog >
        `;
    }
}
