import type Block from '@framework/Block.ts';

export default class Route {
    private _pathname: string;
    private _blockClass: new () => Block;
    private _block: Block | null;
    private _props: BlockProps;

    constructor(pathname: string, view: new () => Block, props: BlockProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block as Block);
            // return;
        }

        this._block.show();
    }
}

function render(query: string, block: Block) {
    const root = document.querySelector(query) as HTMLElement;
    root.innerHTML = ``;
    root.append(block.getContent());
    return root;
}

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}
