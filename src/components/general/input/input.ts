import Block from '@framework/Block.ts';

export default class Input extends Block {

    protected _isValid = false;

    constructor(props: BlockProps) {
        super({
            ...props,
            events: {
                blur: () => {
                    this.validate();
                }
            }
        });
    }

    public getInput(): HTMLInputElement | null {
        const inputValue = this.getElement();
        if (inputValue)
            return inputValue.getElementsByTagName('input')[0];
        else return null;
    }

    public getInputValue(): string {
        const inputField = this.getInput();
        return inputField ? inputField.value : ``;
    }

    public getInputFormData(): object | null {
        const inputField = this.getInput();
        if (!inputField)
            return null;
        return {
            [inputField.name] : inputField.value
        }
    }

    override addEvents() {
        const { events = {} } = this.props;
        const inputValue = this.getInput();
        Object.keys(events).forEach(name => {
            if (inputValue)
                inputValue.addEventListener(name, events[name]);
        });
    }

    override removeEvents() {
        const { events = {} } = this.props;
        const inputValue = this.getInput();
        Object.keys(events).forEach(name => {
            if (inputValue)
                inputValue.removeEventListener(name, events[name]);
        });
    }

    public isValid(): boolean {
        return this._isValid;
    }

    public validate(): boolean {
        let result = false;
        const regex: RegExp | null = this.props.regex;
        if (!regex)
            result = true;
        else if (this.getInputValue()) {
            result = regex.test(this.getInputValue());
        }
        this._isValid = result;
        result ? this.removeValidateError() : this.publishValidateError(`Значение не подходит`);
        return this.isValid();
    }

    public overrideValidationValue(value: boolean) {
        this._isValid = value;
    }

    public publishValidateError(string: string) {
        this.setProps({
            isError: true,
            description: string,
            value: this.getInput()?.value
        })
    }

    public removeValidateError() {
        this.setProps({
            value: this.getInput()?.value,
            isError: false,
            description: ``
        })
    }

    override render() {
        return `
            <div class="field-group">
                <label for="{{id}}">{{label}}</label>
                <input type="{{type}}" id="{{id}}" name="{{id}}" placeholder="{{placeholder}}" value="{{value}}" class="input {{#if isError}}error{{/if}}">
                <div class="description {{#if isError}}error{{/if}}">{{description}}</div>
            </div>
        `;
    }
}
