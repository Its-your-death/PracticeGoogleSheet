<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




// Подключаем клиент Google таблиц
require_once __DIR__ . '/vendor/autoload.php';

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
};

$data = json_decode(file_get_contents("php://input"));
$returnData = [];
if ($_SERVER["REQUEST_METHOD"] != "POST") :
    $returnData = msg(0, 404, 'Page Not Found!');

// Если проверка успешна
else :
    $name = trim($data->name);
    $surname = trim($data->surname);
    $phone = trim($data->phone);
    $email = trim($data->email);
    $comment = trim($data->comment);
    
/* 
    $name = 'Loda';//trim($data->name);
    $surname = 'Loooda' ;//trim($data->surname);
    $phone = '88005553535';//trim($data->phone);
    $email = 'Vt@y.ru' ;//trim($data->email);
    $comment = 'Comment' ;
 */

    // Валидация полей
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) :
        $returnData = msg(0, 400, 'Некорректно введен email!');

    elseif (strlen((string)$phone) != 11) :
        $returnData = msg(0, 403, 'Ваш номер телефона должен содержать 11 цифр!');

    else :
        try {
            // $userName = $dataObject->name;
            // $userSurname = $dataObject->surname;
            // $userPhone = $dataObject->phone;
            // $userEmail = $dataObject->email;
            // $userComm = $dataObject->comment;





// Наш ключ доступа к сервисному аккаунту
                    $googleAccountKeyFilePath = __DIR__ . '/Key.json';
                    putenv('GOOGLE_APPLICATION_CREDENTIALS=' . $googleAccountKeyFilePath);

                    // Создаем новый клиент
                    $client = new Google_Client();
                    // Устанавливаем полномочия
                    $client->useApplicationDefaultCredentials();

                    // Добавляем область доступа к чтению, редактированию, созданию и удалению таблиц
                    $client->addScope('https://www.googleapis.com/auth/spreadsheets');

                    $service = new Google_Service_Sheets($client);

                    // ID таблицы
                    $spreadsheetId = '1J1A3GSNP1q9PmcTOE6qaYkDA6yHC9Lg47PX00dz6KdY';
                    $spreadsheetName = "list1";

                    $values = [
                        [$name,$surname,$phone,$email,$comment]
                    ];


                    $body = new Google_Service_Sheets_ValueRange(['values'=> $values]);

                    $option = array('valueInputOption' => 'USER_ENTERED');

                    $service->spreadsheets_values->append($spreadsheetId, $spreadsheetName, $body, $option);
                    $returnData = msg(1, 201, 'Данные занесены');

            
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    endif;

endif;

echo json_encode($returnData);
