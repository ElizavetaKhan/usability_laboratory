<?php
// Получение входных данных
$input_data = file_get_contents('php://input');
$json_data = json_decode($input_data, true);
$audio_url = $json_data['audio_url'];

// Инициализация cURL-сессии
$ch = curl_init($audio_url);

// Настройка cURL параметров
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Следование за перенаправлениями
curl_setopt($ch, CURLOPT_HEADER, true); // Включение заголовков в выводе

// Заголовки запроса Range, если есть
if (isset($_SERVER['HTTP_RANGE'])) {
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Range: ' . $_SERVER['HTTP_RANGE']));
}

// Выполнение запроса
$response = curl_exec($ch);
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);

// Получение информации о запросе
$info = curl_getinfo($ch);

// Закрытие cURL-сессии
curl_close($ch);

// Установка заголовков для ответа
header('Content-Type: ' . $info['content_type']);
header('Content-Length: ' . strlen($body));
if (isset($info['http_code']) && $info['http_code'] == 206) {
    header('HTTP/1.1 206 Partial Content');
    header('Accept-Ranges: bytes');
    foreach (explode("\r\n", $header) as $header_line) {
        if (stripos($header_line, 'Content-Range:') === 0) {
            header($header_line);
            break;
        }
    }
}

header("Access-Control-Allow-Origin: *");

// Вывод контента файла
echo $body;
?>
