<?php
$user = "root";
$password = "hehez190";

try {
    $pdo = new PDO("mysql:host=localhost:3307;dbname=askalldb", $user, $password);
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

//  SENDING DATA TO DATABASE

$jsonStr = file_get_contents('php://input');
$jsonObj = json_decode($jsonStr);

if (!empty($jsonObj->request_type) && $jsonObj->request_type == 'user_auth') {
    $credential = !empty($jsonObj->credential) ? $jsonObj->credential : '';

    // Decode response payload from JWT token 
    list($header, $payload, $signature) = explode(".", $credential);
    $responsePayload = json_decode(base64_decode($payload));

    if (!empty($responsePayload)) {
        // The user's profile info 
        $oauth_provider = 'google';
        $oauth_uid = !empty($responsePayload->sub) ? $responsePayload->sub : '';
        $first_name = !empty($responsePayload->given_name) ? $responsePayload->given_name : '';
        $last_name = !empty($responsePayload->family_name) ? $responsePayload->family_name : '';
        $email = !empty($responsePayload->email) ? $responsePayload->email : '';
        $picture = !empty($responsePayload->picture) ? $responsePayload->picture : '';


        /// CHECK IF THE EMAIL IS ALREADY EXIST PI
        $querySearch = "SELECT * FROM user WHERE email LIKE :email";
        $dataSearch = [
            ':email' => $email,
        ];
        $stmtSearch = $pdo->prepare($querySearch);
        $stmtSearch->execute($dataSearch);
        if ($stmtSearch->rowCount() > 0) {
            $output = [
                'status' => 2,
                'msg' => 'Email already exist',
            ];
            echo json_encode($output);
            return;
        }

        // INSERT THE EMAIL IN DATABASE
        $queryInsert = "INSERT INTO user(firstName, lastName, email, phoneNumber, passwordd, accountDateCreated) VALUES (:first_name, :last_name, :email,NULL, NULL, CURDATE())";

        $data = [
            ':first_name' => $first_name,
            ':last_name' => $last_name,
            ':email' => $email,
        ];


        try {
            $stmt = $pdo->prepare($queryInsert);
            $stmt->execute($data);
            $output = [
                'status' => 1,
                'msg' => 'Account data inserted successfully!',
                'pdata' => $responsePayload
            ];
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        echo json_encode($output);
    } else {
        echo json_encode(['error' => 'Account data is not available!']);
    }
}

?>