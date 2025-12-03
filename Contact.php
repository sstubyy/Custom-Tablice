<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Invalid request');
}

$name     = trim($_POST['ime'] ?? '');
$surname  = trim($_POST['prezime'] ?? '');
$phone    = trim($_POST['telefon'] ?? '');
$email    = trim($_POST['imejl'] ?? '');
$message  = trim($_POST['poruka'] ?? '');

if (empty($name) || empty($surname) || empty($phone) || empty($email) || empty($message)) {
    die('Molimo popunite sva polja.');
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'lukastojadinovictesla2022@gmail.com';
    $mail->Password = 'jgsd erja ltia resp'; // ✅ keep private
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('lukastojadinovictesla2022@gmail.com', 'NFB Kontakt Forma');
    $mail->addAddress('lukastojadinovictesla2022@gmail.com'); // Owner only
    $mail->isHTML(true);
    $mail->Subject = 'Nova poruka sa kontakt forme';

    $mail->Body = "
        <h2>Nova poruka sa sajta</h2>
        <p><strong>Ime:</strong> {$name}</p>
        <p><strong>Prezime:</strong> {$surname}</p>
        <p><strong>Telefon:</strong> {$phone}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Poruka:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
    ";

    $mail->send();
    header("Location: http://localhost:8000/Redirect.html");
    exit;
} catch (Exception $e) {
    echo "Greška pri slanju: {$mail->ErrorInfo}";
}