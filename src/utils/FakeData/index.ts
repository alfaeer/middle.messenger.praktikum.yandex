export const getChatList = () => {
    return [
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
}

export const getMessageList = () => {
    return [
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
}

export const getProfileData = () => {
    return {
        email: 'some-email@mail.com',
        login: 'IvanLogin123',
        first_name: 'Иван',
        second_name: 'Иванов',
        display_name: 'Иван',
        phone: '+79991234567',
    }
}
