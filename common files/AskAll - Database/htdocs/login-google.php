<?php 
$user = "root";
$password = "hehez190";

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
 

        $Select_email = $pdo->prepare("SELECT * FROM user WHERE email = '$email'");
        $Select_email->execute();
        $result = $Select_email->fetch(PDO::FETCH_ASSOC);
        
       
     if (!empty($result)) {

        $Select_id = $pdo->prepare("SELECT * FROM user WHERE email = '$email'");
         $Select_id->execute();
       $result = $Select_id->fetch(PDO::FETCH_ASSOC);
        $result_id = $result['ID'];
         $update_session = $pdo->prepare("UPDATE sessionn SET ID = '$result_id'");
         $update_session->execute();

             $firstName = $result["firstName"];
          $lastName = $result["lastName"];
           $email = $result["email"];
 $updateLoginTime = $pdo -> prepare("INSERT INTO auditTrail(userID, firstName, lastName, email, login) VALUES ('$result_id', '$first_name', '$last_name', '$email', NOW())"); 
      $updateLoginTime->execute(); 

      if ($updateLoginTime->rowCount() > 0) {
        $output = [ 
            'status' => 1, 
            'msg' => 'Login Succesfully', 
        ]; 
        echo json_encode($output); 
    }
}
else{
    $output = [ 
        'status' => 2, 
        'msg' => 'User does not exist', 
    ]; 
    echo json_encode($output); 
}
                             
    }                              
} 

?>