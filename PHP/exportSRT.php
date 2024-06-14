<?php
    $input_data = file_get_contents('php://input');
    $json_data = json_decode($input_data, true);
    $json_markers = $json_data['markers'];
    date_default_timezone_set('Europe/Moscow');

    // Создание временного файла
    $temp_file = tempnam(sys_get_temp_dir(), 'subtitles');
    $fp = fopen($temp_file, 'w');

    // Запись данных субтитров в файл
    $time_counter = 1;

    foreach ($json_markers as $subtitle) {
        $time = date("H:i:s", $subtitle['secTime']);

        fwrite($fp, $time_counter++ . PHP_EOL);
        fwrite($fp, $time . PHP_EOL);
        fwrite($fp, $subtitle['comment'] . PHP_EOL . PHP_EOL);
    }

    fclose($fp);

    // Отправка заголовков для указания типа содержимого
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="subtitles.srt"');

    readfile($temp_file);
    unlink($temp_file);
?>
