import '@pages/styles.css';

import * as GeneralComponents from '@components/general';
import * as TemplateUtils from '@utils/TemplateUtils';

import {ViewProfile} from './view-profile';
import {EditProfile} from './edit-profile';
import {EditPassword} from './edit-password';


TemplateUtils.prepareAndCompilePage([GeneralComponents,
    {'ViewProfile': ViewProfile},
    {'EditProfile': EditProfile},
    {'EditPassword': EditPassword}
], 'app', ViewProfile, {
    userMail: "IvanSobaka@example.com",
    userLogin: "Ivan1377",
    userName: "Ivan",
    userSecondName: "Ivanov",
    userNickname: "Ivashka",
    userPhoneNumber: "+7(777)7777777",
});


document.getElementById("profile-edit-info")!.addEventListener('click', (e) => {
    e.preventDefault();
    TemplateUtils.compileToHtml('app', EditProfile);
});

document.getElementById("profile-edit-password")!.addEventListener('click', (e) => {
    e.preventDefault();
    TemplateUtils.compileToHtml('app', EditPassword);
});

document.getElementById("profile-edit-exit")!.addEventListener('click', (e) => {
    e.preventDefault();
});

document.getElementById("profile-img-change")!.addEventListener('click', (e) => {
    e.preventDefault();
    // @ts-ignore
    document.getElementById("change-img-container")!.showModal();
});

// @ts-ignore
const handleModalClick = ({currentTarget, target}) => {
    const isClickedOnBackdrop = target === currentTarget;
    if (isClickedOnBackdrop) {
        currentTarget.close();
    }
};

document.getElementById("change-img-container")!.addEventListener("click", handleModalClick);
