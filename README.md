Задачка в рамках первого этапа Я.Практикума - чатик.

Использованы дефолтные макеты - https://www.figma.com/design/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0-1&p=f&t=INFV8csZ4Brmj9Xd-0

Команды:
* npm install - установка зависимостей
* npm run dev - запуск дев-среды
* npm run start - установка пакетов и сборка проекта
* npm run build - typescript validation и сборка
* npm run lint-validation - eslint and styleline validation одним шагом

Ссылка на netlify - https://yandex-practicum-alfaeer.netlify.app

Проект сделан так, что есть основная страничка, на которой настроены ссылки на другие странички, которые открываются в iframe рядом. Главная страничка доступна по ссылке netlify, а остальные странички можно открыть по следующим urls:
* Sign In page - https://yandex-practicum-alfaeer.netlify.app/src/pages/sign-in
* Sign Up page - https://yandex-practicum-alfaeer.netlify.app/src/pages/sign-up
* Chat page - https://yandex-practicum-alfaeer.netlify.app/src/pages/chat
* Profile page - https://yandex-practicum-alfaeer.netlify.app/src/pages/profile
* Error 404 page - https://yandex-practicum-alfaeer.netlify.app/src/pages/error404
* Error 500 page - https://yandex-practicum-alfaeer.netlify.app/src/pages/error500

Редактирование профиля и изменение паролей сделана путем изменения div элемента по нажатию на соответствующие кнопки.
На страничках чата и профиля добавлены тестовые данные.

Навигация по страницам оставлена в старом виде (без перехода на Block), т.к. все равно будет удалена в будущем.

В некоторых местах используется тип any, в некоторых местах используется @ts-ignore, 
там оставлены комментарии почему это сделано. 
