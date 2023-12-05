<?php
session_start();
$_SESSION["otp"] = "";

$user = "root";
$password = "weakka12";

try {
    $pdo = new PDO("mysql:host=localhost;dbname=askalldb", $user, $password);
} catch (PDOException $e) {
    echo $e;
}

//check localhost
$check_session = $pdo->prepare("SELECT ID FROM sessionn"); //ito?
$check_session->execute();
$result_session = $check_session->fetch(PDO::FETCH_ASSOC);
if ($result_session['ID'] != 0) {
    echo "<script>window.location = 'http://localhost:3000/'</script>";
    exit();
}
?>