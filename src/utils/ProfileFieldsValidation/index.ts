import { Input } from "@/components/general";
import Block from "@/framework/Block";


export const loginRegex: RegExp = /^(?=.*[A-Za-z])[A-Za-z\d\-_]{3,20}$/;

export const passwordRegex: RegExp = /^(?=.*[A-ZА-ЯЁ])(?=.*\d)\S{8,40}$/;

export const emailRegex: RegExp = /^[A-Za-z\d\-_]+@[A-Za-z]+\.[A-Za-z]{2,6}$/;

export const namesRegex: RegExp = /^[A-ZА-ЯЁ][a-zа-яё\-]+$/;

export const phoneRegex: RegExp = /^\+?\d{10,15}$/;

export const noneEmptyRegex: RegExp = /^.*$/;

export const validateAndLogin = (page: Block, e: Event) => {
    e.preventDefault();
    let formValidateResult = true;
    let formData = {};
    let password: Input | null = null;
    let passwordConfirm: Input | null = null;
    for (const [key, block] of Object.entries(page.getChildren())) {
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
    }

    if (password && passwordConfirm && password.getInputValue() !== passwordConfirm.getInputValue()) {
        password.overrideValidationValue(false);
        password.publishValidateError(`Пароль и повторный пароль не совпадают`);
        passwordConfirm.overrideValidationValue(false);
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
    for (const [key, block] of Object.entries(page.getChildren())) {
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
    }

    if (password && passwordConfirm && password.getInputValue() !== passwordConfirm.getInputValue()) {
        password.overrideValidationValue(false);
        password.publishValidateError(`Пароль и повторный пароль не совпадают`);
        passwordConfirm.overrideValidationValue(false);
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
