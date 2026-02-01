import Block from '@framework/Block';

export default class Link extends Block {
    constructor(props: BlockProps) {
        super({
            ...props
        });
    }

    override render(): string {
        return `<a id="{{id}}" href="{{link}}" class="{{class}}">{{label}}</a>`;
    }
}
