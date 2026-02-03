import './view-profile.css';

import { Button } from '@/components/general';
import Block from '@framework/Block.ts';
import { EditProfile } from '../edit-profile';
import { EditPassword } from '@pages/profile';
import { connect } from '@framework/Store.ts';
import { logout } from '@service/UserService';
import type { StoreStateObject } from '@/types/store-state-object';

class ViewProfile extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,

            title: 'Редактирование',

            EditProfileButton: new Button({
                id: 'profile-edit-info',
                label: 'Изменить профиль',
                class: 'link',
                events: {
                    click: (e: Event) => {
                        onEditProfileClick(e, this);
                    }
                }
            }),
            EditPasswordButton: new Button({
                id: 'profile-edit-password',
                label: 'Изменить пароль',
                class: 'link',
                events: {
                    click: (e: Event) => {
                        onEditPasswordClick(e, this);
                    }
                }
            }),
            ExitProfileButton: new Button({
                id: 'profile-edit-exit',
                label: 'Выйти',
                class: 'redlink',
                events: {
                    click: (e: Event) => {
                        onExitClick(e);
                    }
                }
            }),
        });
    }

    override render() {
        return `
            <div class="view-profile-container">
                <div class="profile-name">
                    {{first_name}}
                </div>
                <main class="main-container">
                    <table class="view-table">
                        <tr>
                            <th>Почта</th>
                            <td>{{email}}</td>
                        </tr>
                        <tr>
                            <th>Логин</th>
                            <td>{{login}}</td>
                        </tr>
                        <tr>
                            <th>Имя</th>
                            <td>{{first_name}}</td>
                        </tr>
                        <tr>
                            <th>Фамилия</th>
                            <td>{{second_name}}</td>
                        </tr>
                        <tr>
                            <th>Имя в чате</th>
                            <td>{{display_name}}</td>
                        </tr>
                        <tr>
                            <th>Телефон</th>
                            <td>{{phone}}</td>
                        </tr>
                    </table>
                </main>
                <div class="buttons-edit-container">
                    <div class="profile-nav">
                        {{{ EditProfileButton }}}
                        {{{ EditPasswordButton }}}
                        {{{ ExitProfileButton }}}
                    </div>
                </div>
            </div>
        `;
    }
};

function onEditProfileClick(e: Event, context: Block) {
    e.preventDefault();
    const editProfile = new EditProfile({});
    context.getElement()?.replaceWith(editProfile.getContent());
}

function onEditPasswordClick(e: Event, context: Block) {
    e.preventDefault();
    const editPassword = new EditPassword({});
    context.getElement()?.replaceWith(editPassword.getContent());
}

function onExitClick(e: Event) {
    e.preventDefault();
    logout();
}

const storeMapper = (state: StoreStateObject) => {
    return {
        ...state.user,
    };
};

export default connect(storeMapper)(ViewProfile);
