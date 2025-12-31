import Block from '@framework/Block.ts';

export default class Avatar extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
        });

        if (!this.props.width)
            this.props.width = '56px';
        if (!this.props.height)
            this.props.height = '56px';
    }

    override render() {
        return `
            <div class="image-box" width="{{width}}" height="{{height}}">
                <img src="{{url}}" alt width="{{width}}" height="{{height}}">
            </div>
        `
    }
}
