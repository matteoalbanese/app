<?php 
    include 'auth.php';
    if (checkAuth()) {
        header('Location: home.php');
        exit;
    }

    if (!empty($_POST["username"]) && !empty($_POST["password"]) )
    {
        // Se username e password sono stati inviati
        // Connessione al DB
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        // ID e Username per sessione, password per controllo
        $query = "SELECT * FROM users WHERE username = '".$username."'";
        // Esecuzione
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        
        if (mysqli_num_rows($res) > 0) {
            // Ritorna una sola riga, il che ci basta perché l'utente autenticato è solo uno
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['password'])) {

                // Imposto una sessione dell'utente
                $_SESSION["_chainsolver_username"] = $entry['username'];
                $_SESSION["_chainsolver_user_id"] = $entry['id'];
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            }
        }
        // Se l'utente non è stato trovato o la password non ha passato la verifica
        $error = "Username e/o password errati.";
    }
    else if (isset($_POST["username"]) || isset($_POST["password"])) {
        // Se solo uno dei due è impostato
        $error = "Inserisci username e password.";
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
 
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="login.css">

    <!--Per mettere il favicon
    <link rel="icon" type="image/ico" href="immagini/favicon.ico">-->

</head>
<body>

    <?php
        // Verifica la presenza di errori
        if (isset($error)) {
            echo "<p class='error'>$error</p>";
        }
                
    ?>

    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>

    <section>
      <form>
        <h3>Connect your wallet</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"> <?php if(isset($_POST["username"])){echo "value=".$_POST["username"];} ?>>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password"> <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>>

        <button>Log In</button>

        
       
      </form>
      <div id="registrati">
        <h4>Don't have a ChainSolver account?</h4>
        <a href="signup.php">Sign Up</a>
      </div>
    </section>

</body>
</html>