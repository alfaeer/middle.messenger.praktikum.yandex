import { v7 as generateUUID } from 'uuid';
import { EventBus } from '@/framework/EventBus.ts';
import Handlebars from 'handlebars';

export default class Block {

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    protected _element: HTMLElement | null = null;
    protected _id: string = generateUUID();
    protected eventBus: () => EventBus;
    protected children: Record<string, Block>;
    protected props: BlockProps;
    protected data: Record<string, Array<Block>>;

    constructor(propsWithChildren = {}) {
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        const { props, data, children } = this._getChildrenAndProps(propsWithChildren);
        this.props = this._makePropsProxy(props);
        this.data = this._makePropsProxy(data);
        this.children = children;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    protected componentDidMount(): void {};

    private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        const result = this.componentDidUpdate(oldProps, newProps);
        if (result)
            this._render();
    }

    protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        // stupid validation actually, should be deep equaling between old and new props
        return (oldProps && newProps);

    }

    protected addAttributes() {
        const { attr = {} } = this.props;
        if (this._element) {
            Object.entries(attr).forEach(([key, value]) => {
                // added because of TS2531: Object is possibly null
                // but a little earlier I have this validation
                // @ts-ignore
                this._element.setAttribute(key, value as string);
            });
        }
    }

    protected _render() {
        const props = { ...this.props };
        const tmpId = generateUUID();

        Object.entries(this.children).forEach(([key, child]) => {
            props[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.data).forEach(([key]) => {
            props[key] = `<div data-id="${tmpId}"></div>`
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(props);

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub)
                stub.replaceWith(child.getContent());
        });

        Object.entries(this.data).forEach(([, child]) => {
            const listContent = this._createDocumentElement('template');
            child.forEach(item => {
                if (item instanceof Block) {
                    listContent.content.append(item.getContent());
                } else {
                    listContent.content.append(`${item}`);
                }
            })
            const stub = fragment.content.querySelector(`[data-id="${tmpId}"]`);
            if (stub)
                stub.replaceWith(listContent.content);
        });

        this._removeEvents();
        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement)
            this._element.replaceWith(newElement);
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    public render(): string {
        return ``;
    }

    protected _createDocumentElement(tag: string): HTMLTemplateElement {
        return document.createElement(tag) as HTMLTemplateElement;
    }

    protected _addEvents(): void {
        this.addEvents();
    }

    public addEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach(name => {
            if (this._element)
                this._element.addEventListener(name, events[name]);
        });
    }

    protected _removeEvents(): void {
        this.removeEvents();
    }

    public removeEvents(): void {
        const { events = {} } = this.props;
        Object.keys(events).forEach(name => {
            if (this._element)
                this._element.removeEventListener(name, events[name]);
        });
    }

    private _getChildrenAndProps(propsAndChildren: BlockProps) {
        const children: Record<string, Block> = {};
        const props: BlockProps = {};
        const data: Record<string, Array<Block>> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else if (value instanceof Array) {
                data[key] = value;
            } else {
                props[key] = value;
            }
        });
        return { children, props, data };
    }

    private _makePropsProxy(props: BlockProps): BlockProps {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target };
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('No access');
            }
        });
    }

    protected init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    public setProps(nextProps: BlockProps) {
        if (nextProps) {
            const { children, props, data } = this._getChildrenAndProps(nextProps);
            Object.assign(this.props, props);
            Object.assign(this.children, children);
            Object.assign(this.data, data);
        }
    };

    public setData(nexData: Record<string, Array<Block>>) {
        if (nexData == null) {
            this.data = {}
        }

        Object.assign(this.data, nexData);
    }

    public getProps() {
        return this.props;
    }

    public getData() {
        return this.data;
    }

    public getContent() {
        if (!this._element)
            throw new Error('Element is not created yet');
        return this._element;
    };

    public getElement() {
        return this._element;
    };

    public getChildren() {
        return this.children;
    }

    public show() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    public hide() {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}
