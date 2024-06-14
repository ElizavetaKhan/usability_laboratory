export default class VkAPIServise {
    static async exchangeTokenToAccessToken(name, id, id_session) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/exchangeTokenToAccessToken.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                id: id,
                id_session: id_session
            })
        })
            .then(
                async response => await response.json())
            .then(data => {
                // Перенаправляем пользователя на URL авторизации VK
                window.location.href = data.redirect_url;
            })
            .catch(error => {
                console.error("Ошибка при запросе на авторизацию VK:", error);
            });
    }

    static async getGroups(access_token) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getGroups.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token: access_token,
            })
        })
            .then(
                async response => await response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Ошибка при запросе на получение групп VK:", error);
            });
    }

    static async getUploadLink(group_id) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getUploadLink.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                group_id: group_id,
            })
        })
            .then(
                async response => await response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Ошибка при запросе на получение ссылки на загрузку видео в VK:", error);
            });
    }

    static async getVideoPlayerLink(owner_id, video_id) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getVideoPlayerLink.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                owner_id: owner_id,
                video_id: video_id,
            })
        })
            .then(
                async response => await response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Ошибка при запросе на получение плеера загруженного видео:", error);
            });
    }
}