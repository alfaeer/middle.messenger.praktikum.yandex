import Block from '@framework/Block';

export default class Button extends Block {
    constructor(props: BlockProps) {
        super({
            ...props
        });
    }

    override render(): string {
        return `<button id="{{id}}" type="{{type}}" class="button {{class}}">{{label}}</button>`;
    }
}
