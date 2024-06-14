<?php
    $project_name = $_COOKIE['project_name'];
    $id_project = $_COOKIE['id_project'];
    $code = $_GET['code'];

    // Устанавливаем параметры запроса
    $params = array(
        'client_id' => "51917753",
        'client_secret' => "nZnGkcVVlJQHl3kioeHe",
        'redirect_uri' => "https://protocol.lavro.ru/public_html/PHP/redirect.php",
        'code' => $code,
    );

    $url = 'https://oauth.vk.com/access_token?' . http_build_query($params);
    // Инициализация cURL-сессии
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_VERBOSE, true); // Включаем вывод отладочной информации
    $response = curl_exec($curl);

    if ($response === false) {
        die('Error: ' . curl_error($curl));
    }
    curl_close($curl);

    // Обработка ответа
    $data = json_decode($response, true);
    if ($data === null) {
        die('Error decoding JSON');
    }

    setcookie("access_token", $data['access_token'], time() + 86400, "/");

    header("Location: https://protocol.lavro.ru/public_html/#/projects/{$project_name}/{$id_project}");
    exit();
?>
