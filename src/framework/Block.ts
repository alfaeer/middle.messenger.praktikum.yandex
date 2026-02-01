import { v7 as generateUUID } from 'uuid';
import { EventBus } from '@/framework/EventBus.ts';
import Handlebars from 'handlebars';
import { isEquals } from '@utils/ObjectUtils';

export default class Block {

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    protected _element?: HTMLElement;
    protected _id: string = generateUUID();
    protected eventBus: () => EventBus;
    protected children: Record<string, Block | null>;
    protected props: BlockProps;
    protected data: Record<string, Array<Block> | null>;

    constructor(propsWithChildren: BlockProps = {}) {
        const eventBus = new EventBus();
        this.eventBus = () => eventBus;

        const { props, data, children } = this._getChildrenAndProps(propsWithChildren);
        this.props = this._makePropsProxy(props);
        this.data = this._makePropsProxy(data);
        this.children = this._makePropsProxy(children);

        if (this.props.doctitle)
            document.title = this.props.doctitle;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.FLOW_CDM);
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
        Object.values(this.children).forEach(child => {
            if (child !== null)
                child.dispatchComponentDidMount()
        });
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
        return !isEquals(oldProps, newProps);
    }

    protected addAttributes() {
        const { attr = {} } = this.props;
        if (this._element) {
            for (const [key, value] of Object.entries(attr)) {
                this._element.setAttribute(key, value as string);
            }
        }
    }

    protected _render() {
        const props = { ...this.props };
        const tmpId = generateUUID();

        Object.entries(this.children).forEach(([key, child]) => {
            if (child !== null)
                props[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.data).forEach(([key, child]) => {
            if (child !== null)
                props[key] = `<div data-id="${tmpId}"></div>`
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(props);

        Object.values(this.children).forEach(child => {
            if (child !== null) {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
                if (stub)
                    stub.replaceWith(child.getContent());
            }
        });

        Object.entries(this.data).forEach(([, child]) => {
            if (child !== null) {
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
            }
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
        const children: Record<string, Block | null> = {};
        const props: BlockProps = {};
        const data: Record<string, Array<Block> | null> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            /*console.log({key, value});
            console.log('isBlock?: ', value instanceof Block);
            console.log('isArray?: ', value instanceof Array);
            console.log('isNull?: ', value === null);*/
            if (value instanceof Block) {
                children[key] = value;
            } else if (value instanceof Array) {
                data[key] = value;
            } else if (value !== null) {
                props[key] = value;
            } else {
                children[key] = null;
                data[key] = null;
                props[key] = null;
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
            }
        });
    }

    protected init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private removeNullValues(mainProps: BlockProps, newProps: BlockProps) {
        // console.log('removeNullValues', { mainProps, newProps });
        Object.entries(newProps).forEach(([key, value]) => {
            if (value === null) {
                console.log('found null value, removing')
                delete mainProps[key];
            }
        });
        // console.log('after Removing', mainProps);
        return mainProps;
    }

    public setProps(nextProps: BlockProps) {
        if (nextProps) {
            const { children, props, data } = this._getChildrenAndProps(nextProps);
            // console.log('before Object.assign', { props, children, data });

            Object.assign(this.props, props);
            this.props = this.removeNullValues(this.props, props);
            Object.assign(this.children, children);
            this.children = this.removeNullValues(this.children, children);
            Object.assign(this.data, data);
            this.data = this.removeNullValues(this.data, data);

            // console.log('after Object.assign');
            // console.log('this.props = ', this.props);
            // console.log('this.children = ', this.children);
            // console.log('this.data = ', this.data);
        }
    };

    public setConnectedProps(props: BlockProps): void {
        this.setProps(props);
    }

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
