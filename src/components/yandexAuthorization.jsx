import React, {useEffect} from 'react';

const YandexAuthorization = () => {

    window.YaAuthSuggest.init(
        {
            client_id: "2dae84f3ff4946af866414cffba8dc55",
            response_type: "token",
            redirect_uri: "https://protocol.lavro.ru/public_html/PHP/redirectYandex.php"
        },
        "https://protocol.lavro.ru",
        {
            view: "button",
            parentId: "containerID",
            buttonSize: 'l',
            buttonView: 'additional',
            buttonTheme: 'light',
            buttonBorderRadius: "24",
            buttonIcon: 'ya',
        }
    )
        .then(({handler}) => handler())
        .then(data => console.log('Сообщение с токеном', data))
        .catch(error => console.log('Обработка ошибки', error))

    return (
        <>

        </>
    );
};

export default YandexAuthorization;