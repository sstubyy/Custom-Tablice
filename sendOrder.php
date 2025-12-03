<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['status' => 'error']);
    exit;
}

$customer = $data['customer'] ?? [];
$cart = $data['cart'] ?? [];
$total = $data['total'] ?? 0;

$total = preg_replace('/[^\d.]/', '', $total);
$total = (float) $total;

// ✅ Validacija
if (
    empty($customer['name']) ||
    empty($customer['phone']) ||
    empty($customer['address']) ||
    empty($customer['city']) ||
    empty($customer['postcode']) ||
    empty($customer['country']) ||
    empty($customer['email']) ||
    empty($customer['paymentMethod']) ||
    count($cart) === 0
) {
    echo json_encode(['status' => 'error']);
    exit;
}

// 📌 Funkcija za HTML telo mejla
function generateOrderBody($customer, $cart, $total, $mail) {
    $body = "<h2>Podaci kupca</h2>";
    $body .= "Ime i prezime: " . htmlspecialchars($customer['name']) . "<br>";
    $body .= "Telefon: " . htmlspecialchars($customer['phone']) . "<br>";
    $body .= "Adresa: " . htmlspecialchars($customer['address']) . "<br>";
    $body .= "Grad: " . htmlspecialchars($customer['city']) . "<br>";
    $body .= "Postanski broj: " . htmlspecialchars($customer['postcode']) . "<br>";
    $body .= "Drzava: " . htmlspecialchars($customer['country']) . "<br>";
    $body .= "Email: " . htmlspecialchars($customer['email']) . "<br>";
    $body .= "Nacin placanja: " . htmlspecialchars($customer['paymentMethod']) . "<br>";

    $body .= "<h2>Detalji porudzbine</h2>";
    foreach ($cart as $index => $item) {
        // Ako je Euro ili Arial → Ram
        if (($item[0] ?? '') === "Euro" || ($item[0] ?? '') === "Arial") {
            $body .= "<p><strong>Ram</strong><br>";
        } else {
            $body .= "<p><strong>" . htmlspecialchars($item[0] ?? '') . "</strong><br>";
        }
        $body .= "Opis: " . htmlspecialchars($item[1] ?? '') . "<br>";
        $body .= "Kolicina: " . intval($item[3] ?? 0) . "<br>";
        $body .= "Ukupno: " . intval($item[4] ?? 0) . " RSD<br>";

        // Dodavanje slike
        if (!empty($item[5]) && strpos($item[5], 'base64,') !== false) {
            $parts = explode('base64,', $item[5]);
            if (count($parts) === 2) {
                $imgData = base64_decode($parts[1]);
                if ($imgData !== false) {
                    $cid = "plate" . $index . uniqid();
                    $mail->addStringEmbeddedImage($imgData, $cid, "plate$index.png", 'base64', 'image/png');
                    $body .= "<img src='cid:$cid' style='max-width:200px; margin-top:5px;'><br>";
                }
            }
        }
        $body .= "</p>";
    }

    $body .= "<h3>Ukupno: " . number_format($total, 0, ',', '.') . " RSD</h3>";
    return $body;
}

try {
    // ------------------
    // 📩 Email vlasniku
    // ------------------
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'lukastojadinovictesla2022@gmail.com';
    $mail->Password = 'jgsd erja ltia resp';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('lukastojadinovictesla2022@gmail.com', 'Custom Plates Shop');
    $mail->addAddress('lukastojadinovictesla2022@gmail.com'); // 📌 SAMO vlasnik
    $mail->isHTML(true);
    $mail->Subject = 'Nova porudzbina od ' . htmlspecialchars($customer['name']);
    $mail->Body = generateOrderBody($customer, $cart, $total, $mail);
    $mail->send();

    // ------------------
    // 📩 Email kupcu
    // ------------------
    $mail2 = new PHPMailer(true);
    $mail2->isSMTP();
    $mail2->Host = 'smtp.gmail.com';
    $mail2->SMTPAuth = true;
    $mail2->Username = 'lukastojadinovictesla2022@gmail.com';
    $mail2->Password = 'jgsd erja ltia resp';
    $mail2->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail2->Port = 587;

    $mail2->setFrom('lukastojadinovictesla2022@gmail.com', 'Custom Plates Shop');
    $mail2->addAddress($customer['email']); // 📌 SAMO kupac
    $mail2->isHTML(true);
    $mail2->Subject = 'Vasa porudzbina - Custom Plates Shop';
    $mail2->Body = generateOrderBody($customer, $cart, $total, $mail2) .
        "<br><br><strong>Ako ste pogresno uneli detalje ili zelite promenu / otkazivanje narudzbine, kontaktirajte nas na broj: +381 69 1926 112</strong>";

    $mail2->send();

    echo json_encode(['status' => 'ok']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}