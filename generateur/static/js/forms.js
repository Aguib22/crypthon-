(function message(){
    setTimeout(()=>{
        var msg = document.getElementById("msg");
        msg.style.display = "none";
    },5000)
})();

function afficherFenetreModale() {
    
    
    var modal = document.getElementById("modal");
    modal.style.display = "block";

    // Gérer la fermeture de la fenêtre modale lorsque l'utilisateur clique sur le bouton OK
    var okBtn = document.getElementById("okBtn");
    okBtn.onclick = function() {
        modal.style.display = "none"; // Cacher la fenêtre modale lorsque l'utilisateur clique sur OK
        commande.reset();
        // Soumettre le formulaire via AJAX
        var formData = new FormData(commande); // Récupérer les données du formulaire
        var xhr = new XMLHttpRequest();
        xhr.open("POST", commande.action); // Utiliser l'URL d'action du formulaire
        xhr.onload = function() {
            // Traiter la réponse de la soumission du formulaire si nécessaire
        };
        xhr.send(formData); // Envoyer les données du formulaire
    };

}

let commande = document.querySelector('#valid');
console.log(commande);

// evenement portant sur l'ecoute de l'email
commande.nom.addEventListener('change',function(){
validationNom(this);
});
// 
commande.prenom.addEventListener('change',function(){
validationPrenom(this);
});
commande.profession.addEventListener('change',function(){
validationProfession(this);
});
// evenment portant sur l'ecoute de l'email
commande.email.addEventListener('change',function(){
validationEmail(this);
});
// evenement sur lu numéro de telephone
commande.telephone.addEventListener('change',function(){
validationPhone(this);
});



// soumission du formulaire ,l'evenement submit
commande.addEventListener('submit',(e)=>{
e.preventDefault();
let champsValides = true;


// Vérification de la validité de tous les champs
if (!validationPrenom(commande.prenom)) champsValides = false;
if (!validationNom(commande.nom)) champsValides = false;
if (!validationProfession(commande.profession)) champsValides = false;
if (!validationEmail(commande.email)) champsValides = false;
if (!validationPhone(commande.telephone)) champsValides = false;

    if (champsValides) {
        commande.submit();
        console.log("tous les champs sont bien remplis");
    }

    

},false);


// **************** validation name *******************
function validationNom(inputName){
let samll = inputName.previousElementSibling;
if(inputName.value ==" " || inputName.value==""){
    samll.innerHTML = 'donner votre nom svp!';
    samll.style.color='red';
    return false;
}else{
    samll.innerHTML="";
    return true;
} 
}
function validationPrenom(inputName){
let samll = inputName.previousElementSibling;
if(inputName.value ==" " || inputName.value =="" ){
    samll.innerHTML = 'donner votre prenom svp!';
    samll.style.color='red';
    return false;
}else{
    samll.innerHTML="";
    return true;
} 
}

function validationProfession(inputName){
let samll = inputName.previousElementSibling;
if(inputName.value =="" || inputName.value==" "){
    samll.innerHTML = 'donner votre profession svp!';
    samll.style.color='red';
    return false;
}else{
    samll.innerHTML="";
    return true;
} 
}
// **************validation de l'email******************
function validationEmail(inputEmail){
let expressionReg= new RegExp(
    '^[a-zA-Z0-9_.]*[@]{1}[a-z]*[.]{1}[a-z]{2,8}$','g'
);

let valid = expressionReg.test(inputEmail.value);
let samll = inputEmail.previousElementSibling;

if (valid){
    samll.innerHTML="";
    return true ;
}
else{
    samll.innerHTML='Adresse non valide';
    samll.style.color='red';
    return false;
}
};


// ******************validation du numéro de telephone *************************

function validationPhone(inputPhone){
let msg ;
let valid = false;
if(!/['0-9']/.test(inputPhone.value)){
    msg='le numéro de télephone est incorrect ';
}else if (inputPhone.value.length > 9 || inputPhone.value.length < 9 ){
    msg = 'numero de téléphone invalide'
}
else{
    msg="";
    valid = true;
}

let samll = inputPhone.previousElementSibling;
if(valid){
    samll.innerHTML="";
    return true;
}
else{
    samll.innerHTML = msg;
    samll.style.color =' red';
    return false;
}
};