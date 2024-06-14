<?php
    $host = "localhost"; // Хост базы данных
    $username = "host700505_play"; // Имя пользователя базы данных
    $password = "3469"; // Пароль пользователя базы данных
    $database = "host700505_protocol"; // Имя базы данных

    $connection = new mysqli($host, $username, $password, $database);

    $input_data = file_get_contents('php://input');
    $json_data = json_decode($input_data, true);
    $login = $connection->real_escape_string($json_data['lg']);
    $pass = $connection->real_escape_string($json_data['pw']);

    // Проверка наличия ошибок при подключении
        if ($connection->connect_error) {
            die('Ошибка подключения к базе данных: ' . $connection->connect_error);
        }

        $result = $connection->multi_query("CALL registration('$login','$pass')");
        // Проверка успешности выполнения запроса
        if ($result) {
            // Получение результата
            if ($result = $connection->store_result()) {
                $row = $result->fetch_assoc();
                // Проверка наличия ошибки
                if (isset($row['ERROR'])) {
                    echo json_encode(array("ERROR" => $row['ERROR']));
                } else {
                    $tk = $row['tk'];
                    setcookie("token", $tk, time() + 86400, "/");
                    setcookie("login", $login, time() + 86400, "/");
                }
                $result->free();
            } else {
                die("Ошибка при вызове процедуры: " . $connection->errno);
            }
        } else {
            die("Ошибка при выполнении запроса: " . $connection->errno);
        }

    $connection->close();
?>