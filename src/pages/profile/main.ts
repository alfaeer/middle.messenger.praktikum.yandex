import '@pages/profile/profile.css';

import Block from '@framework/Block.ts';
import { ViewProfile } from './view-profile';

import { Avatar, DialogContainer, Link, Input, Button } from '@components/general';
import * as userService from '@service/UserService.ts';
import { connect } from '@framework/Store.ts';
import type { StoreStateObject } from '@/types/store-state-object';

class ProfilePage extends Block {
    constructor() {
        super({
            doctitle: 'Профиль',

            MessengerLink: new Link({
                id: 'messenger-link',
                link: '/messenger',
                class: 'button primary round',
                label: '🡠'
            }),

            Avatar: new Avatar({
                width: '156px',
                height: '156px',
                events: {
                    click: () => {
                        const dialog = new DialogContainer({
                            title: 'Загрузите файл',
                            content: '{{{ AvatarInput }}}',

                            AvatarInput: new Input({
                                id: 'avatar-input',
                                lable: 'Выбрать файл на компьютере',
                                type: 'file',
                            }),

                            buttons: [
                                new Button({
                                    id: 'changeAvatar',
                                    type: 'submit',
                                    class: 'primary',
                                    label: 'Поменять',
                                    events: {
                                        click: () => {
                                            console.log('Step 1')
                                            userService.updateProfileAvatar(dialog.getChildren().AvatarInput as Input);
                                            dialog.hide();
                                        }
                                    }
                                })
                            ]
                        })

                        this.getContent().append(dialog.getContent());
                        dialog.show();
                    }
                }
            }),

            ViewProfile: new ViewProfile({})
        });
    }

    override setProps(nextProps: BlockProps): void {
        this.getChildren().Avatar!.setProps({url : nextProps.avatar});
        super.setProps(nextProps);
    }

    override componentDidMount(): void {
        userService.validateSession(this.constructor.name);
    }


    override render() {
        return `
            <div class="profile-container">
                <div class="profile-sidebar">
                    {{{ MessengerLink }}}
                </div>
                <div class="profile-main">
                    <div class="avatar-container">
                        {{{ Avatar }}}
                    </div>
                    <div id="main-box" class="main-box">
                        {{{ ViewProfile }}}
                    </div>
                </div>
            </div>
        `;
    }
}

const storeMapper = (state: StoreStateObject)=> {
    return {
        ...state.user
    }
}

export default connect(storeMapper)(ProfilePage);
