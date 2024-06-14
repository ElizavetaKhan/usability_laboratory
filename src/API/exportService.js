export default class ExportService {
    static async exportSRT(markers) {
        const json_data = JSON.stringify({markers});
        return fetch("https://protocol.lavro.ru/public_html/PHP/exportSRT.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json_data
        })
             .then(res => {
                return res.blob();}
            )
            .then(
                (result) => {
                    // Создание ссылки для скачивания файла
                    const url = window.URL.createObjectURL(new Blob([result]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'subtitles.srt');
                    document.body.appendChild(link);
                    link.click();

                    // Очистка ссылки и ресурсов
                    link.parentNode.removeChild(link);
                    window.URL.revokeObjectURL(url);
                },

                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    console.warn(error);
                }
            )
    }
}