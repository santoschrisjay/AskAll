<?php 
$user = "root";
$password = "hehez190";

try {
    $pdo = new PDO("mysql:host=localhost;dbname=askalldb", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo $e;
}


//check localhost
$check_session = $pdo->prepare("SELECT ID FROM sessionn"); //ito?
$check_session->execute();
$result_session = $check_session->fetch(PDO::FETCH_ASSOC);
// if ($result_session['ID'] != 0) {
//     echo "<script>window.location = 'http://localhost:3000/'</script>";
//     exit();
// }

//  SENDING DATA TO DATABASE

$jsonStr = file_get_contents('php://input'); 
$jsonObj = json_decode($jsonStr); 
 
if(!empty($jsonObj->request_type) && $jsonObj->request_type == 'user_auth'){ 
    $credential = !empty($jsonObj->credential)?$jsonObj->credential:''; 
 
    // Decode response payload from JWT token 
    list($header, $payload, $signature) = explode (".", $credential); 
    $responsePayload = json_decode(base64_decode($payload)); 
 
    if(!empty($responsePayload)){ 
        // The user's profile info 
        $oauth_provider = 'google'; 
        $oauth_uid  = !empty($responsePayload->sub)?$responsePayload->sub:''; 
        $first_name = !empty($responsePayload->given_name)?$responsePayload->given_name:''; 
        $last_name  = !empty($responsePayload->family_name)?$responsePayload->family_name:''; 
        $email      = !empty($responsePayload->email)?$responsePayload->email:''; 
        $picture    = !empty($responsePayload->picture)?$responsePayload->picture:''; 
 
        // Check whether the user data already exist in the database 
        // $query = "SELECT * FROM users WHERE oauth_provider = '".$oauth_provider."' AND oauth_uid = '".$oauth_uid."'"; 
        // $result = $db->query($query); 
         
        // if($result->num_rows > 0){  
        //     // Update user data if already exists 
        //     $query = "UPDATE users SET first_name = '".$first_name."', last_name = '".$last_name."', email = '".$email."', picture = '".$picture."', modified = NOW() WHERE oauth_provider = '".$oauth_provider."' AND oauth_uid = '".$oauth_uid."'"; 
        //     $update = $db->query($query); 
        // }else{ 
         

        //     $query = "INSERT INTO users VALUES (NULL, '".$oauth_provider."', '".$oauth_uid."', '".$first_name."', '".$last_name."', '".$email."', '".$picture."', NOW(), NOW())"; 
        //     $insert = $db->query($query); 
        // }
        $queryInsert = "INSERT INTO user(firstName, lastName, email, phoneNumber, passwordd, accountDateCreated) VALUES (:first_name, :last_name, :email, NULL, NULL, CURDATE())";
     
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
        } 
        catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        echo json_encode($output); 
    }else{ 
        echo json_encode(['error' => 'Account data is not available!']); 
    } 
} 

?>