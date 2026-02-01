import Block from '@framework/Block.ts';

export default class UserField extends Block {
    private selected = false;

    constructor(props: BlockProps) {
        super({
            ...props,
            events: {
                click: () => {
                    this.selected = !this.selected;
                    this.setProps({ selected: this.selected })
                }
            }
        });
    }

    public isSelected(): boolean {
        return this.selected;
    }

    override render() {
        return `
            <div class="user-field {{#if selected}}selected{{/if}}" data-id="{{id}}">
                <div class="avatar-description">
                    {{{ Avatar }}}
                </div>
                <div class="user-description">
                    <p>{{ display_name }} ({{ login }})</p>
                    <p>{{ first_name }} {{ second_name }}</p>
                </div>
            </div>
        `;
    }
}
