<?php 
    include './database.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>AskAll - The Ultimate Website Assistant for Everything</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="Free HTML Templates" name="keywords">
  <meta content="Free HTML Templates" name="description">

  <!-- Favicon -->
	<link rel="icon" type="image/svg+xml" href="favicon.png">
  
  <!-- Google Web Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Rubik:wght@400;500;600;700&display=swap"
    rel="stylesheet">

  <!-- Icon Font Stylesheet -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

  <!-- Libraries Stylesheet -->
  <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
  <link href="lib/animate/animate.min.css" rel="stylesheet">

  <!-- Customized Bootstrap Stylesheet -->
  <link href="./bootstrap.min.css" rel="stylesheet">

  <!-- Template Stylesheet -->
  <link href="./style.css" rel="stylesheet">
</head>

<body>
  <!-- Spinner Start -->

  <!-- Spinner End -->


  <!-- Topbar Start -->
  <div class="container-fluid bg-dark px-5 d-none d-lg-block">
    <div class="row gx-0">
      <div class="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
        <div class="d-inline-flex align-items-center" style="height: 45px;">
          <small class="me-3 text-light"><i class="fa fa-map-marker-alt me-2"></i>Don Honorio Ventura State
            University</small>
          <small class="me-3 text-light"><i class="fa fa-phone-alt me-2"></i>+639086050160</small>
          <small class="text-light"><i class="fa fa-envelope-open me-2"></i>askall.web@gmail.com</small>
        </div>
      </div>
      <div class="col-lg-4 text-center text-lg-end">
        <div class="d-inline-flex align-items-center" style="height: 45px;">
          <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i
              class="fab fa-twitter fw-normal"></i></a>
          <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i
              class="fab fa-facebook-f fw-normal"></i></a>
          <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i
              class="fab fa-linkedin-in fw-normal"></i></a>
          <a class="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2" href=""><i
              class="fab fa-instagram fw-normal"></i></a>
        </div>
      </div>
    </div>
  </div>
  <!-- Topbar End -->


  <!-- Navbar & Carousel Start -->
  <div class="container-fluid position-relative p-0">
    <nav class="navbar navbar-expand-lg navbar-dark px-5 py-5 py-lg-0">
      <a href="/login" class="navbar-brand p-0">
        <h1 class="m-0 py-2"><i class="fa fa-user-tie me-2"></i>AskAll</h1>
      </a>
    </nav>

    <!-- Navbar Continuation -->
    <div id="header-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="w-100" src="img/dhvsu-background.png" alt="Image">
                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">

                    <!--LOGIN START-->
                    <div class="container pb-5 mb-sm-4">
                        <div class="row pt-5">
                            <div class="col-md-6 pt-sm-3 mx-auto mb-5">
                                <div class="card">
                                    <div class="card-body p-5">
                                        <h1 class="section-title text-center position-relative pb-3 mb-2">Forgot
                                            Password?</h1>
                                        <h3 class="h6 font-weight-semibold opacity-70 pt-4 pb-2">Please enter your email
                                            address, and we'll send you a verification code to proceed to the next step.
                                        </h3>
                                        <form class="needs-validation" act="" method="POST">
                                            <!--Email-->
                                            <div class="input-group form-group my-4">
                                                <div class="input-group-prepend"><span class="input-group-text"><i
                                                    class="fa fa-envelope input-icon"></i></span></div>
                                                <input name="email" class="form-control" type="email" placeholder="Email"
                                                    required="">
                                                <div class="invalid-feedback">Please enter valid email address!</div>
                                            </div>
                                            <div class="d-flex flex-wrap justify-content-between">
                                                <p class="text-dark">Wrong button?
                                                    <a class="nav-link-inline font-size-sm mx-3" href="./index.php">Sign
                                                        In</a>
                                                    <a class="nav-link-inline font-size-sm mx-3"
                                                        href="./register.php">Register</a>
                                                </p>
                                            </div>
                                            <hr class="text-dark">
                                            <div class="text-right pt-4">
                                                <button name="sendCode" class="btn btn-primary py-3 px-5 wow zoomIn"
                                                    data-wow-delay="0.9s" type="submit">Send Code</button>
                                            </div>
                                        </form>
                                        <?php 
                                            use PHPMailer\PHPMailer\PHPMailer;
                                            use PHPMailer\PHPMailer\Exception;

                                            require './vendor/autoload.php';

                                            function generateOTP($length = 6) {
                                                $characters = '0123456789';
                                                $otp = '';
                                                for ($i = 0; $i < $length; $i++) {
                                                    $otp .= $characters[rand(0, strlen($characters) - 1)];
                                                }
                                                return $otp;
                                            }
                                            $otp = "";

                                            $mail = new PHPMailer(true);
                                            if(isset($_POST['sendCode'])){
                                                $email = $_POST['email'];
                                                
                                                $check_email = $pdo->prepare("SELECT email FROM user WHERE email = '$email'");
                                                $check_email->execute();
                                                $result = $check_email->fetch(PDO::FETCH_ASSOC);
                                                if(!empty($result)){
                                                    $_SESSION['otp'] = generateOTP();
                                                    $_SESSION['email'] = $email;
                                                    try {
                                                        $mail->SMTPDebug = 0;
                                                        $mail->isSMTP();
                                                        $mail->Host = 'smtp.gmail.com';
                                                        $mail->SMTPAuth = true; 
                                                        $mail->Username = 'askall.web@gmail.com'; 
                                                        $mail->Password = 'qasx ndsv wrht hdwu'; 
                                                        $mail->SMTPSecure = 'tls'; 
                                                        $mail->Port = 587;
                                                    
                                                        $mail->setFrom('askall.web@gmail.com', 'ASK ALL');
                                                        $mail->addAddress($email); 
                                                        $mail->addReplyTo('askall.web@gmail.com', 'ASK ALL');
                                                    
                                                        $mail->isHTML(true);
                                                        $mail->Subject = 'Your OTP for Verification';
                                                        $mail->Body = "Your OTP is: ".$_SESSION['otp']; 
                                                    
                                                        $mail->send();

                                                        echo "<script>window.location = './ForgotPasswordVerification.php'</script>";
                                                        exit();
                                                    } catch (Exception $e) {
                                                        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
                                                    }
                                                }else{
                                                    echo "<h6>Account doesn't exist. Please check your email and try again</h6>";
                                                }
                                            }
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid text-white" style="background: #061429;">
  <div class="container text-center">
    <div class="row justify-content-end">
      <div class="col-lg-8 col-md-6">
        <div class="d-flex align-items-center justify-content-center" style="height: 75px;">
          <p class="mb-0">&copy; <a class="text-white border-bottom" href="#">AskAll</a>. All Rights Reserved.

            Special Thanks To <a class="text-white border-bottom" href="#">References</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- JavaScript Libraries -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="lib/wow/wow.min.js"></script>
<script src="lib/easing/easing.min.js"></script>
<script src="lib/waypoints/waypoints.min.js"></script>
<script src="lib/counterup/counterup.min.js"></script>
<script src="lib/owlcarousel/owl.carousel.min.js"></script>

<!-- Template Javascript -->
<script src="./main.js"></script>
</body>

</html>