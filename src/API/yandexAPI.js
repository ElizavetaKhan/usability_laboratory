export default class YandexAPI {
    static async getUploadLink() {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getUploadLinkYandex.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(
                async response => await response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Ошибка при запросе на получение ссылки на загрузку аудио на Яндекс Диск:", error);
            });
    }

    static async publishAudio(name) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/publishAudio.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            })
        })
            .then(
                async response => await response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Ошибка при публикации файла на Яндекс Диск:", error);
            });
    }

    static async getAudioLink(name) {
        return fetch("https://protocol.lavro.ru/public_html/PHP/getAudioLink.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            })
        })
            .then(
                async response => await response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error("Ошибка при запросе на получение загруженного на Яндекс Диск аудио:", error);
            });
    }

    static async proxyAudio(audio_url) {
        const response = await fetch("https://protocol.lavro.ru/public_html/PHP/proxyAudio.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio_url: audio_url,
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }

}