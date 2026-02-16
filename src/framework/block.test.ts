import Block from './Block';

describe('Block tests', () => {
    let testBlock: new(props: BlockProps) => Block;

    beforeEach(() => {
        class SimpleDiv extends Block {
            constructor(props: BlockProps) {
                super({ ...props });
            }

            render(): string {
                return '<div id="{id}">{{text}}</div>';
            }
        }

        testBlock = SimpleDiv;
    });

    it('block creating works', () => {
        const el = new testBlock({ id: 'test', text: 'test' });

        expect(el.getContent().textContent).toBe('test');
    });

    it('render works', () => {
        const el = new testBlock({ id: 'test', text: 'test' });

        el.show();
        expect(el.getContent().style.display).toBe('block');

        el.hide();
        expect(el.getContent().style.display).toBe('none');

    });

    it('props update works', () => {
        const el = new testBlock({ id: 'test', text: 'test' });

        // used any because of spyOn not found correct method, because Block does not contain property _render
        const listener = jest.spyOn(el as any, '_render');
        el.setProps({ text: 'updated' });
        expect(listener).toHaveBeenCalledTimes(1);
    });
});
