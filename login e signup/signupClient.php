<?php
    require_once 'auth.php';

    if (checkAuth()) {
        header("Location: home.php");
        exit;
    }
    

    // Verifica l'esistenza di dati POST
    if(!empty($_POST["username"]) && !empty($_POST["email"]) && !empty($_POST["firstname"]) && !empty($_POST["lastname"]) && !empty($_POST["password"]) && !empty($_POST["confirm_password"]) && !empty($_POST["allow"])) 
    {
        $error = array();
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        
        # USERNAME
        // Controlla che l'username rispetti il pattern specificato
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            // Cerco se l'username esiste già o se appartiene a una delle 3 parole chiave indicate
            $query = "SELECT username FROM users WHERE username = '$username'";
            $res = mysqli_query($conn, $query);
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Username già utilizzato";
            }
        }
        # PASSWORD
        if (strlen($_POST["password"]) < 8) {
            $error[] = "Caratteri password insufficienti";
        } 
        # CONFERMA PASSWORD
        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $error[] = "Le password non coincidono";
        }
        # EMAIL
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM users WHERE email = '$email'");
            if (mysqli_num_rows($res) > 0) {
                $error[] = "Email già utilizzata";
            }
        }

        # REGISTRAZIONE NEL DATABASE
        if (count($error) == 0) {

            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);
            $firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
            $lastname = mysqli_real_escape_string($conn, $_POST['lastname']);

            $query = "INSERT INTO users(username, firstname, lastname, email, password) VALUES('$username', '$firstname', '$lastname', '$email', '$password')";
            
            if (mysqli_query($conn, $query)) {
                $_SESSION["_chainsolver_username"] = $_POST["username"];  
                $_SESSION["_chainsolver_user_id"] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: home.php");
                exit;
            } else {
                $error[] = "Errore di connessione al Database";
            }
        }
        mysqli_close($conn);
    }
    else if (isset($_POST["firstname"])) {
        $error = array("Riempi tutti i campi");
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Up - Client</title>
 
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="signupClient.css">
    <script src='signupFreelancer.js' defer></script>

    <!--Per mettere il favicon
    <link rel="icon" type="image/ico" href="immagini/favicon.ico">-->

</head>
<body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
    </div>

    <section>
      <form name='signup' method='post' enctype="multipart/form-data" autocomplete="off">
        <h3>Sign Up to find work you love</h3>

        <div class="firstname">
        <label for="firstname">First Name</label>
        <input type="text" placeholder="First Name" id="firstname"> <?php if(isset($_POST["firstname"])){echo "value=".$_POST["firstname"];} ?>>
        <span> Devi inserire il tuo nome </span>
        </div>

        <div class="lastname">
        <label for="lastname">Last Name</label>
        <input type="text" placeholder="Last Name" id="lastname"> <?php if(isset($_POST["lastname"])){echo "value=".$_POST["lastname"];} ?>>
        <span> Devi inserire il tuo cognome </span>
        </div>

        <div class="username">
        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"> <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>
        <span> Nome utente non disponibile </span>
        </div>

        <div class="email">
        <label for="email">Email</label>
        <input type="text" placeholder="Email" id="email"> <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>>
        <span> Indirizzo email non valida </span>
        </div>

        <div class="password">
        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"> <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>
        <span> Inserisci almeno 8 caratteri </span>
        </div>

        <div class="confirm_password">
        <label for="confirm_password">Confirm Password</label>
        <input type="text" placeholder="Confirm Password" id="confirm_password"> <?php if(isset($_POST["confirm_password"])){echo "value=".$_POST["confirm_password"];} ?>>
        <span> Le password non corrispondono </span>
        </div>

        <div id="allow">
        <input type='checkbox' name='allow' value="1" id="allow" <?php if(isset($_POST["allow"])){echo $_POST["allow"] ? "checked" : "";} ?>>
        <label for='allow'>Accetto i termini e condizioni d'uso di ChainSolver.</label>
        </div>

        <?php if(isset($error)) {
            foreach($error as $err) {
                echo "<div class='errorj'><span>".$err."</span></div>";
            }
        } ?>

        <div class="submit">
            <input type='submit' value="Create my account" id="submit">
        </div>

     </form>

     <div id="registrati">
        <h4>Loking for work?</h4>
        <a href="signupFreelancer.php">Apply as talent</a>
     </div>

    </section>

</body>
</html>