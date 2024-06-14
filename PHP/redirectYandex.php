<!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redirect Page</title>
        </head>
        <body>
            <script>
            var hash = window.location.hash;
            var params = hash.substring(1).split("&");
            var accessToken;

            function getCookie(name) {
                const cookieString = document.cookie;
                const cookies = cookieString.split('; ');
                for (let cookie of cookies) {
                    const [cookieName, cookieValue] = cookie.split('=');
                    if (cookieName === name) {
                        return decodeURIComponent(cookieValue);
                    }
                }
                return null;
            }

            params.forEach(function(param) {
                var keyValue = param.split("=");
                var key = keyValue[0];
                var value = keyValue[1];
                if (key === "access_token") {
                    accessToken = value;
                }
            });

            var expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1);
            document.cookie = "OAuth-token=" + accessToken + "; expires=" + expirationDate.toUTCString() + "; path=/";

            const name = getCookie('project_name');
            const id_project = getCookie('id_project');
            window.location.href = `https://protocol.lavro.ru/public_html/#/projects/${name}/${id_project}`;
            </script>
        </body>
</html>
