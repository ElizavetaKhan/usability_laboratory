<?php
    $input_data = file_get_contents('php://input');
    $json_data = json_decode($input_data, true);

    setcookie("project_name", $json_data['name'], time() + 600, "/");
    setcookie("id_project", $json_data['id'], time() + 600, "/");
    setcookie("id_session", $json_data['id_session'], time() + 600, "/");

    // Получаем необходимые параметры из запроса
    $client_id = "51917753";
    $redirect_uri = "https://protocol.lavro.ru/public_html/PHP/redirect.php";
    $scope = "groups, video, audio";
    $response_type = "code";
    $display = "popup";
    $v = "5.199";
    $state = "asdfghjkl";

    // Формируем URL для открытия диалога авторизации
    $auth_url = "https://oauth.vk.com/authorize?client_id={$client_id}&redirect_uri={$redirect_uri}&display={$display}&scope={$scope}&response_type={$response_type}&v={$v}&state={$state}&revoke=1";

    echo json_encode(['redirect_url' => $auth_url]);
?>