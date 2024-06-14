<?php
    $input_data = file_get_contents('php://input');
    $json_data = json_decode($input_data, true);
    $name = $json_data['name'];
    $OAuthtk = $_COOKIE['OAuth-token'];

    $params = array(
        'path' => 'USABILITY_LABORATORY/' . $name,
    );

    $url = 'https://cloud-api.yandex.net/v1/disk/resources/download?' . http_build_query($params);
    // Инициализация cURL-сессии
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Authorization: OAuth ' . $OAuthtk]);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_VERBOSE, true); // Включаем вывод отладочной информации
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_HEADER, false);
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

    echo json_encode($data);
?>