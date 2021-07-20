<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// Подключаем клиент Google таблиц
require_once __DIR__ . '/vendor/autoload.php';
try {

$JSONData = file_get_contents("php://input");
$dataObject = json_decode($JSONData);


$userName = $dataObject->name;
$userSurname = $dataObject->surname;
$userPhone = $dataObject->phone;
$userEmail = $dataObject->email;
$userComm = $dataObject->comment;




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

echo json_encode($values);
}
catch(Throwable $th){
    echo json_encode($th-> getMessage());
}
    
    
