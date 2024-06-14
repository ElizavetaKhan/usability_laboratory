<?php
    $host = "localhost"; // Хост базы данных
    $username = "host700505_play"; // Имя пользователя базы данных
    $password = "3469"; // Пароль пользователя базы данных
    $database = "host700505_protocol"; // Имя базы данных
    $connection = new mysqli($host, $username, $password, $database);

    $tk = $connection->real_escape_string($_COOKIE['token']);

    $input_data = file_get_contents('php://input');
    $json_data = json_decode($input_data, true);
    $session = $connection->real_escape_string($json_data['session']);

    // Проверка наличия ошибок при подключении
        if ($connection->connect_error) {
            die('Ошибка подключения к базе данных: ' . $connection->connect_error);
        }

        $result = $connection->multi_query("CALL endPause('$tk','$session')");
        // Вызов хранимой процедуры
        if (!$result) {
            die("Ошибка при вызове процедуры: " . $connection->connect_error);
            exit();
        } else {
            $result = $connection->store_result()->fetch_assoc();
            echo json_encode($result);
        }

        $connection->close();
?>