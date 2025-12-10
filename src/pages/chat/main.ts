import '@pages/styles.css';

import {ChatPage} from "@pages/chat";
import * as GeneralComponents from '@components/general'
import * as TemplateUtils from '@utils/TemplateUtils'

import {ChatSearch} from "@components/chat/chat-search";
import {ChatField} from "@components/chat/chat-field";
import {ChatList} from "@components/chat/chat-list";
import {Editor} from "@components/chat/editor";
import {MessageField} from "@components/chat/message-field";
import {MessageBox} from "@components/chat/message-box";


TemplateUtils.prepareAndCompilePage([GeneralComponents,
    {'ChatSearch': ChatSearch}
], 'app', ChatPage);

TemplateUtils.prepareAndCompilePage([
    {'ChatList': ChatList},
    {'ChatField': ChatField}
], 'chat-box', ChatList, {
    chatList: [
        {
            id: 1,
            profileName: "Sasha",
            message: "Some default message",
            messageTime: "10:53",
            avatar: "/images/default_1.jpg",
            selected: true
        },
        {
            id: 2,
            profileName: "Pasha",
            message: "Wow what is interesting message",
            messageTime: "15:03",
            notifications: 5,
            avatar: "/images/default_2.jpg"
        },
        {
            id: 3,
            profileName: "Dasha",
            message: "Typical woman message",
            messageTime: "07:00",
            notifications: 1,
            avatar: "/images/default_1.jpg"
        },
        {
            id: 4,
            profileName: "Masha",
            message: "Not so typical woman message",
            messageTime: "Fr",
            avatar: "/images/default_1.jpg"
        },
        {
            id: 5,
            profileName: "Glasha",
            message: "Unusal rustic message",
            messageTime: "20:44",
            notifications: 11,
            avatar: "/images/default_2.jpg"
        },
    ]
})

TemplateUtils.prepareAndCompilePage([
    {'Editor': Editor},
    {'MessageField': MessageField},
    {'MessageBox': MessageBox}
], 'message-box', MessageBox, {
    id: 1,
    profileName: "Sasha",
    avatar: "/images/default_1.jpg",
    messages: [
        {
            id: 1,
            text: "Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message Here is some message ",
            time: "10:05",
            userMessage: false
        },
        {
            id: 2,
            text: "Here is my message",
            time: "10:08",
            userMessage: true
        }
    ]
})
