<?php
require('lib/PHPMailerAutoload.php');
define('SMTPUSER', 'sonuqureshi1512@gmail.com'); // sec. smtp username
define('SMTPPWD', '546172839'); // sec. password
define('SMTPSERVER', 'smtp.gmail.com'); // sec. smtp server
define('PORT', 587); // sec. smtp port
function smtpmailer($to, $from, $from_name, $subject, $body, $is_gmail = true)
{
    global $error;
    $mail = new PHPMailer();
    $mail->SMTPDebug = 4;
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    echo 'sending mail via gmail';
        /*$mail->SMTPSecure = 'ssl';*/
        $mail->Host = SMTPSERVER;
        $mail->Port = PORT;
        $mail->Username = SMTPUSER;
        $mail->Password = SMTPPWD;
    $mail->SetFrom($from, $from_name);
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->AddAddress($to);
    if (!$mail->Send()) {
        $error = 'Mail error: ' . $mail->ErrorInfo;
        return false;
    } else {
        $error = 'Message sent!';
        return true;
    }
}

$msg = 'Hello World';
$subj = 'test mail message';
$to = 'ashifqureshi15@gmail.com';
$from = 'sonuqureshi1512@mail.com';
$name = 'Ashif Qureshi';

if (smtpmailer($to, $from, $name, $subj, $msg)) {
    echo 'Yippie, message send via Gmail';
} else {
    echo $error;
    /*if (!smtpmailer($to, $from, $name, $subj, $msg)) {
        if (!empty($error)) echo $error;
    } else {
        echo 'Yep, the message is send (after doing some hard work)';
    }*/
}

?>