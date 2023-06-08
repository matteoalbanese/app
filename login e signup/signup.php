<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">
    <title>Sign Up</title>
 
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="signup.css">
    <script src='signup.js' defer></script>

    <!--Per mettere il favicon
    <link rel="icon" type="image/ico" href="immagini/favicon.ico">-->
    </head>

    <body>

    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>

    <section>
        
        <form name='signup' method='post' enctype="multipart/form-data" autocomplete="off">
            <h3>Join as a client or freelancer </h3>
            <div id="client">
                <input type='checkbox' name='client' value="1" id="client" <?php if(isset($_POST["allow"])){echo $_POST["allow"] ? "checked" : "";} ?>>
                <label for='client'>I'm a client, hiring for a project</label>
            </div>

            <div id="freelancer">
                <input type='checkbox' name='freelancer' value="1" id="freelancer" <?php if(isset($_POST["allow"])){echo $_POST["allow"] ? "checked" : "";} ?>>
                <label for='freelancer'>I'm a freelancer, looking for a work</label>
            </div>
        </form>
        
        <a id="bottone"><button>Create Account</button></a>

        <div id="login">
        <h4>Already have an account?</h4>
        <a id="log" href="login.php">Log In</a>
        
        </div>

    </section>
    </body>
</html>