import { Input } from "@/components/general";
import Block from "@/framework/Block";


export const loginRegex: RegExp = /^(?=.*[A-Za-z])[A-Za-z\d\-_]{3,20}$/;

export const passwordRegex: RegExp = /^(?=.*[A-ZА-Я])(?=.*\d)\S{8,40}$/;

export const emailRegex: RegExp = /^[A-Za-z\d\-_]+@[A-Za-z]+\.[A-Za-z]{2,6}$/;

export const namesRegex: RegExp = /^[A-ZА-Я][a-zа-я\-]+$/;

export const phoneRegex: RegExp = /^\+?\d{10,15}$/;

export const noneEmptyRegex: RegExp = /^.*$/;

export const validateAndLogin = (page: Block, e: Event) => {
    e.preventDefault();
    let formValidateResult = true;
    let formData = {};
    let password: Input | null = null;
    let passwordConfirm: Input | null = null;
    Object.entries(page.getChildren()).forEach(([key, block]: [string, Block]) => {
        if (block instanceof Input) {
            if (!block.validate())
                formValidateResult = false;
            else
                formData = Object.assign(formData, block.getInputFormData());

            if (key === 'PasswordInput')
                password = block;
            if (key === 'PasswordConfirmInput')
                passwordConfirm = block;
        }
    });

    // I don't know why it throws error TS2339: Property getInputValue does not exist on type never,
    // but I have validations it is not null, it is equals to Input class,...
    // so in general ts should understand what is it here, but throws error
    // @ts-ignore
    if (password && passwordConfirm && password.getInputValue() !== passwordConfirm.getInputValue()) {
        // @ts-ignore
        password.overrideValidationValue(false);
        // @ts-ignore
        password.publishValidateError(`Пароль и повторный пароль не совпадают`);
        // @ts-ignore
        passwordConfirm.overrideValidationValue(false);
        // @ts-ignore
        passwordConfirm.publishValidateError(`Пароль и повторный пароль не совпадают`);
        formValidateResult = false;
    }

    if (formValidateResult) {
        console.log(`everything is valid, logging using this object: ${JSON.stringify(formData)}`);
        alert("Successful login or registration will be in future.");
    } else
        alert(`Исправьте выделенные поля, чтобы они проходили валидацию`);
    return formValidateResult;
};

export const validatePasswordChange = (page: Block, e: Event) => {
    e.preventDefault();
    let formValidateResult = true;
    let formData = {};
    let password: Input | null = null;
    let passwordConfirm: Input | null = null;
    Object.entries(page.getChildren()).forEach(([key, block]: [string, Block]) => {
        if (block instanceof Input) {
            if (!block.validate())
                formValidateResult = false;
            else
                formData = Object.assign(formData, block.getInputFormData());

            if (key === 'NewPasswordInput')
                password = block;
            if (key === 'ConfirmPasswordInput')
                passwordConfirm = block;
        }
    });

    // I don't know why it throws error TS2339: Property getInputValue does not exist on type never,
    // but I have validations it is not null, it is equals to Input class,...
    // so in general ts should understand what is it here, but throws error
    // @ts-ignore
    if (password && passwordConfirm && password.getInputValue() !== passwordConfirm.getInputValue()) {
        // @ts-ignore
        password.overrideValidationValue(false);
        // @ts-ignore
        password.publishValidateError(`Пароль и повторный пароль не совпадают`);
        // @ts-ignore
        passwordConfirm.overrideValidationValue(false);
        // @ts-ignore
        passwordConfirm.publishValidateError(`Пароль и повторный пароль не совпадают`);
        formValidateResult = false;
    }

    if (formValidateResult) {
        console.log(`everything is valid, password will be changed using this object: ${JSON.stringify(formData)}`);
        alert("Successful password change will be in future.");
    } else
        alert(`Исправьте выделенные поля, чтобы они проходили валидацию`);
    return formValidateResult;
}
