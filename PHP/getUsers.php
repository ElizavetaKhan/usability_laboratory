<?php
    $host = "localhost"; // Хост базы данных
    $username = "host700505_play"; // Имя пользователя базы данных
    $password = "3469"; // Пароль пользователя базы данных
    $database = "host700505_protocol"; // Имя базы данных
    $connection = new mysqli($host, $username, $password, $database);

    $tk = $connection->real_escape_string($_COOKIE['token']);
    // Проверка наличия ошибок при подключении
    if ($connection->connect_error) {
        die('Ошибка подключения к базе данных: ' . $connection->connect_error);
    }

    // Вызов хранимой процедуры
    if ($connection->multi_query("CALL getUsers()")) {
        $result = $connection->store_result();

        // Преобразование данных в массив
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        $result->free();
        $jsonData = json_encode($data);
        echo $jsonData;

    } else {
        die("Ошибка при вызове процедуры: " . $connection->connect_error);
        exit();
    }
    $connection->close();
?>