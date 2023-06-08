function client(){

    document.querySelector('#freelancer').classList.remove('verde');
    document.querySelector('#freelancer input').checked = false;
    document.querySelector('#client').classList.add('verde');
    document.querySelector('button').classList.add('vbottone');
    document.querySelector('button').textContent="Join as a Client";
    document.querySelector('#bottone').href="signupClient.php";
}

function freelancer(){

    document.querySelector('#client').classList.remove('verde');
    document.querySelector('#client input').checked=false;
    document.querySelector('#freelancer').classList.add('verde');
    document.querySelector('button').classList.add('vbottone');
    document.querySelector('button').textContent="Apply as a Freelancer";
    document.querySelector('#bottone').href="signupFreelancer.php";
}

document.querySelector('#client input').addEventListener('click', client);
document.querySelector('#freelancer input').addEventListener('click', freelancer);

