<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Подключаем клиент Google таблиц
require_once __DIR__ . '/vendor/autoload.php';


$JSONData = file_get_contents("php://input");
$dataObject = json_decode($JSONData);
    $returnData = [];

            $userName = $dataObject->name;
            $userSurname = $dataObject->surname;
            $userPhone = $dataObject->phone;
            $userEmail = $dataObject->email;
            $userComm = $dataObject->comment;
    
            if (strlen((string)$userPhone) != 11) :
                $returnData = 'Ваш номер телефона должен содержать 11 цифр!';
                else :try {





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
                        [$userName,$userSurname,$userPhone,$userEmail,$userComm]
                    ];


                    $body = new Google_Service_Sheets_ValueRange(['values'=> $values]);

                    $option = array('valueInputOption' => 'USER_ENTERED');

                    $service->spreadsheets_values->append($spreadsheetId, $spreadsheetName, $body, $option);
                    $returnData = [
                        'success' => 1,
                        'message' => 'Успех'];
}
catch(PDOException $e){
    $returnData = msg(0, 500, $e->getMessage());
    echo json_encode($returnData);
}
endif;  
echo json_encode($returnData);  
