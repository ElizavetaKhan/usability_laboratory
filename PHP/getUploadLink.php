<?php
    $input_data = file_get_contents('php://input');
    $json_data = json_decode($input_data, true);
    $access_token = $_COOKIE['access_token'];
    $group_id = $json_data['group_id'];

    // Устанавливаем параметры запроса
    $params = array(
        'access_token' => $access_token,
        'v' => '5.199',
        'group_id' => $group_id,
        'privacy_comment' => 'nobody',
        'privacy_view' => 'by_link',
    );

    $url = 'https://api.vk.com/method/video.save?' . http_build_query($params);
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
    echo json_encode($data);
?>
