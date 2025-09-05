<?
	header('Content-Type: text/html; charset=utf-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailerAutoload.php';

	$name = isset( $_POST['name'] ) ? htmlspecialchars($_POST["name"]) : "";
	$phone = isset( $_POST['phone'] ) ? htmlspecialchars($_POST["phone"]) : "";
	$email = isset( $_POST['email'] ) ? htmlspecialchars($_POST["email"]) : "";
	$mess = isset( $_POST['message'] ) ? htmlspecialchars($_POST["message"]) : "";
	$project_name = isset( $_POST['project_name'] ) ? htmlspecialchars($_POST["project_name"]) : "";
	$form_subject = isset( $_POST['form_subject'] ) ? htmlspecialchars($_POST["form_subject"]) : "";
	$id_form = isset( $_POST['id_form'] ) ? htmlspecialchars($_POST["id_form"]) : "";
	$filename1 = isset( $_FILES['file'] ) ? $_FILES['file'] : "";
	$isFiles = '';


	$msg = "
	<h4>$form_subject</h4>
	<h5>ID формы: $id_form</h5>
	<hr>
	<strong>ФИО:</strong> $name<br>
	<strong>Телефон:</strong>  $phone<br>
	<strong>Email:</strong>  $email<br>
	<strong>Сообщение: </strong>  $mess<br>
	<hr>
	";

	// $mailer = "lisicun.aleksandr@gmail.com"; 			//кому почту
	$mailer = "regyri@i.ua"; 													//кому почту
	$mail = new PHPMailer();
	$mail->From = 'regyri@i.ua';      								// от кого 
	$mail->FromName = $project_name;   								// от кого
	$mail->CharSet = "UTF-8";
	$mail->IsHTML(true);        											// выставляем формат письма HTML
	$mail->Subject = $form_subject;  													// тема письма;

	// if (!empty($_FILES['file']['name'][0])) {
	//     foreach ($_FILES['file']['name'] as $key => $value) {
	//         $out_files = array("name"=>$_FILES['file']['name'][0], "tmp_name" => $_FILES['file']['tmp_name'][0]);
	//     }
	//     $filesSend = true;
	// } else {
	//     $filesSend = false;
	// }
	// if ($filesSend) {
	//     foreach ($out_files as $k=>$v) {
	//         $mail->addAttachment( $_FILES['file']['name'] );
	//     }
	// }

	// $response['filess'] = $out_files;

	// $mail->addAttachment($filename1);

// if ( array_key_exists('file', $_FILES) ) {
//     $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['file']['name']));
//     if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
        
//         $mail->addAttachment($uploadfile, $_FILES['file']['name']);
//         $isFiles = 'есть';
        
//     } else {
//         $response['message'] = 'Failed to move file to ' . $uploadfile;
//         // die( json_encode($response) ); 
//     }
// }

// $response['files'] = $_FILES;

if (isset($_FILES['files']) && !empty($_FILES['files'])) {
    $no_files = count($_FILES["files"]['name']);
    for ($i = 0; $i < $no_files; $i++) {
        if ($_FILES["files"]["error"][$i] > 0) {
            $response['files'] = "Error: " . $_FILES["files"]["error"][$i] . "<br>";
        } else {     
        	$uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['files']['name'][$i]));
        	move_uploaded_file($_FILES['files']['tmp_name'][$i], $uploadfile);
        	$mail->addAttachment($uploadfile, $_FILES['files']['name'][$i]);
        	$isFiles = 'есть';            
        }
    }
} else {
    $response['files'] = 'Please choose at least one file';
}


	$mail->Body = $msg;
	$mail->AddAddress($mailer); 
	// $mail->Send();  					// если убрать все что ниже влючить эту строку.
	
	if( $mail->Send() ) {
		//все ок
		$response['ok_send'] = true;
	}
	else {
		// ошибка
		$response['ok_send'] = false;
		$response['message'] = 'Произошла ошибка при отправке сообщения на почту';
	}




/* =============================================================================
   Send to Google Doc
   ========================================================================== */

// подготовим данные для отправки в гугл форму
$url = 'https://docs.google.com/forms/d/e/1FAIpQLScttjoabonnGzu4W9AgS0sgIjRpI0f9eixAb0_uH3RsperGkQ/formResponse'; // атрибут action у гугл формы 

$data = array(); 
$data['entry.792187084'] = $name; 
$data['entry.542143461'] = $phone;
$data['entry.1962635184'] = $email;
$data['entry.843197265'] = $mess;
$data['entry.1842433660'] = $form_subject;
$data['entry.1384867718'] = $id_form;
$data['entry.642778150'] = $isFiles;

$data = http_build_query($data); 

$options = array( 
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => $data,
    ),
);
$context  = stream_context_create($options); 
$result = file_get_contents($url, false, $context); 


if (!$result) { 
	$response['ok'] = false; 
	$response['message'] = 'Что-то пошло не так, попробуйте отправить позже.';
	die( json_encode($response) ); 
}else{
	$response['ok'] = true;
	$response['message'] = 'Все ок, отправилось.';
	die( json_encode($response) ); 
}


?>