import '@pages/profile/profile.css';

import Block from '@framework/Block.ts';
import { ViewProfile } from './view-profile';

import * as FakeData from '@utils/FakeData';
import { Avatar } from '@components/general';

export default class ProfilePage extends Block {
    constructor() {
        super({
            title: 'Профиль',

            Avatar: new Avatar({
                url: '/images/default_1.jpg',
                width: '156px',
                height: '156px'
            })
        });
    }

    override render() {
        return `
            <div class="profile-container">
                <div class="profile-sidebar">
                    <a href="/src/pages/chat/" class="button primary round">🡠</a>
                </div>
                <div class="profile-main">
                    <div class="avatar-container">
                            {{{ Avatar }}}
                    </div>
                    <div id="main-box" class="main-box">
                        Профиль загружается...
                    </div>
                </div>
            </div>
        `;
    }
}

const page = new ProfilePage();
document.getElementById('app')?.replaceWith(page.getContent());

const viewProfile = new ViewProfile({
    ...FakeData.getProfileData()
});
document.getElementById('main-box')?.replaceWith(viewProfile.getContent());
