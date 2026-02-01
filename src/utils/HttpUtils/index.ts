export const handleHttpError = (resp: XMLHttpRequest, showError: boolean) => {
    const response = JSON.parse(resp.response);
    const error = `${resp.status}: ${response.error ? response.error + ': ' : ''}${response.reason}`;
    console.error(error);
    if (showError)
        alert(error);
    return error;
};

export const fixAvatarUrls = (object: UserDataType | UserDataType[] | ChatDataType | ChatDataType[]) => {
    if (object instanceof Array) {
        object.forEach(val => {
            if (!val.avatar) {
                if (val.hasOwnProperty('login'))
                    val.avatar = '/images/default-user.jpg';
                else
                    val.avatar = '/images/default-chat.jpg';
            } else
                if (val.avatar.indexOf('/images/default-') < 0 && val.avatar.indexOf('http') < 0)
                    val.avatar = 'https://ya-praktikum.tech/api/v2/resources' + val.avatar;
        });
    } else {
        if (!object.avatar) {
            if (object.hasOwnProperty('login'))
                object.avatar = '/images/default-user.jpg';
            else
                object.avatar = '/images/default-chat.jpg';
        } else
            if (object.avatar.indexOf('/images/default-') < 0)
                object.avatar = 'https://ya-praktikum.tech/api/v2/resources' + object.avatar;
    }
    return object;
}

export const convertTimeStringToTime = (string: string | undefined): string => {
    if (!string)
        return '';

    let date = new Date(string);
    return (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()) + ":" +
        (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes());
}

export const replaceHtmlTags = (val : string) => {
    const searchsimbol = new RegExp(`[()<>=&]`, "gi")
    console.log(val);
    function replacer(match : string) : string {
        if (match == "<") {return "&lt;"};
        if (match == ">") {return "&gt;"};
        if (match == "(") {return "&#40;"};
        if (match == ")") {return "&#41;"};
        if (match == "=") {return "&#61с;"};
        if (match == "&") {return "&amp;"};
        return match
    }
    return val.replace(searchsimbol, replacer);
}
