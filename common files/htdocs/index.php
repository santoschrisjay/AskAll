<?php
session_start();
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
  <link href="img/favicon.ico" rel="icon">

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
    </div>
      <div id="header-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="w-100" src="./img/dhvsu-background.png" alt="Image">
                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">

                    <!--LOGIN START-->
                    <div class="container pb-5 mb-sm-4">
                        <div class="row pt-5">
                            <div class="col-md-6 pt-sm-3 mx-auto mb-5">
                                <div class="card">
                                    <div class="card-body p-5">
                                        <h1 class="section-title text-center position-relative pb-3 mb-2">Sign
                                            in</h1>
                                        <div class="d-sm-flex align-items-center py-3">
                                            <h3 class="h4 font-weight-semibold opacity-70 mb-3 mb-sm-2 mr-sm-3">Sign in
                                                with:
                                            </h3>
                                            <div>
                                                <a class="btn btn-md btn-outline-dark rounded-circle me-2 mx-2 mb-1"
                                                    href=""><i class="fab fa-facebook-f fw-normal fa-lg"></i></a>
                                                <a class="btn btn-md btn-outline-dark rounded-circle me-2 mx-1 mb-1"
                                                    href=""><i class="fab fa-google fw-normal fa-md"></i></a>
                                            </div>
                                        </div>
                                        <hr class="text-dark">
                                        <h3 class="h6 font-weight-semibold opacity-70 pt-4 pb-2">Or using form below
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
                                            <!--Password-->
                                            <div class="input-group form-group mb-3">
                                                <div class="input-group-prepend"><span class="input-group-text"><i
                                                    class="fa fa-lock input-icon"></i></span></div>
                                                <input name="passwordd" class="form-control" type="password" placeholder="Password"
                                                    required="">
                                                <div class="invalid-feedback">Please enter valid password!</div>
                                            </div>
                                            <div class="d-flex flex-wrap justify-content-between">
                                                <p class="text-dark">Don't have an Account?
                                                    <a class="nav-link-inline font-size-sm" href="./register.php">
                                                        Register</a>
                                                </p>
                                                <a class="nav-link-inline font-size-sm" href="./forgotPassword.php">Forgot
                                                    password?</a>
                                            </div>
                                            <hr class="text-dark">
                                            <div class="text-right pt-4">
                                                <button name="signIn" class="btn btn-primary py-3 px-5 wow zoomIn"
                                                    data-wow-delay="0.9s" type="submit">Sign In</button>
                                            </div>
                                        </form>
                                        <?php
                                        if (isset($_POST['signIn'])) {
                                          $email = $_POST['email'];
                                          $passwordd = $_POST['passwordd'];

                                          if (!empty($email) || !empty($passwordd)) {
                                            $Select_email = $pdo->prepare("SELECT passwordd FROM user WHERE email = '$email'");
                                            $Select_email->execute();
                                            $result = $Select_email->fetch(PDO::FETCH_ASSOC);
                                            if (!empty($result)) {
                                              $passwordHash = md5($passwordd);
                                              if ($passwordHash == $result['passwordd']) {
                                                $Select_id = $pdo->prepare("SELECT ID FROM user WHERE email = '$email'");
                                                $Select_id->execute();
                                                $result = $Select_id->fetch(PDO::FETCH_ASSOC);
                                                $result_id = $result['ID'];
                                                $update_session = $pdo->prepare("UPDATE sessionn SET ID = '$result_id'");
                                                $update_session->execute();
                                                echo "<script>window.location = 'http://localhost:3000/'</script>";
                                                exit();
                                              } else {
                                                echo "<h6>Invalid Email or Password</h6>";
                                              }
                                            } else {
                                              echo "<h6>Invalid Email or Password</h6>";
                                            }
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