// RECUPERA USUARIOS DESDE LOCALSTORAGE AL CARGAR LA PAGINA.
let users = JSON.parse(localStorage.getItem('users')) || [];

//TEXTOS PARA VERIFICAR SI EL CODIGO FUNCIONA.
let p = document.getElementById('showUser');

//FUNCION PRINCIPAL PARA REGISTRO.
if(document.getElementById('signUpForm')){
document.getElementById('signUpForm').addEventListener('submit', function (e) {
    e.preventDefault();//EVITA QUE SE RECARGUE LA PAGINA.

  //VARIABLES DE LA FUNCION.
    let newFirstName = document.getElementById("firstNameNewUser").value.trim();
    let newLastName = document.getElementById("lastNameNewUser").value.trim();
    let newEmail = document.getElementById("emailNewUser").value.trim();
    let newUserName = document.getElementById("usernameNewUser").value.trim();
    let newPassword = document.getElementById("passwordNewUser").value.trim();
    let confirmPassword = document.getElementById("confirmPasswordNewUser").value.trim();
    let termsAccepted = document.getElementById("termsCheckbox").checked;

  //1. VERIFICAR SI TODOS LOS CAMPOS ESTAN COMPLETOS.
    if (newFirstName === "" || newLastName === "" || newEmail === "" || newUserName === "" || newPassword === "" || confirmPassword === "") {
        p.style.color = "red";
        p.innerHTML = "Completa Todos Los Campos.";
        return;
    } else {
        p.innerHTML = "";
    }

  //2. VERIFICA SI YA HAY UN CORREO EXISTENTE.
    if (users.some(u => u.email === newEmail)) {
        p.style.color = "red";
        p.innerHTML = "El Correo: " + newEmail + " Ya Esta Registrado";
        document.getElementById("emailNewUser").value = "";
        return;
    } else {
        p.innerHTML = "";
    }

  //3. VERIFICA SI UN NOMBRE DE USUARIO YA ESTA REGISTRADO.
    if (users.some(u => u.username === newUserName)){
        p.style.color = "red";
        p.innerHTML = "El Nombre de usuario " + newUserName + " Ya Esta Registrado";
        document.getElementById("usernameNewUser").value = "";
        return;
    } else {
        p.innerHTML = "";
    }

  //4. VERIFICA SI LA CONTRASEÑA ES CORRECTA.
    if (newPassword !== confirmPassword) {
        p.style.color = "red";
        p.innerHTML = "Contraseña Incorrecta.";
        return;
    } else {
        p.innerHTML = "";
    }

  //5. VERIFICA SI SE HAN ACEPTADO LOS TERMINOS & CONDICIONES.
    if (!termsAccepted) {
        p.style.color = "red";
        p.innerHTML = "Debes Aceptar Los Terminos & Condiciones."
        return;
    } else {
        p.innerHTML = "";
    }

  //6. REGISTRAR USUARIOS.
    users.push({
        firstName : newFirstName,
        lastName : newLastName,
        email : newEmail,
        username : newUserName,
        password : confirmPassword
    });

    // Guardar usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(users));

  //7. LIMPIAR INPUTS.
    document.getElementById("firstNameNewUser").value = "";
    document.getElementById("lastNameNewUser").value = "";
    document.getElementById("emailNewUser").value = "";
    document.getElementById("usernameNewUser").value = "";
    document.getElementById("passwordNewUser").value = "";
    document.getElementById("confirmPasswordNewUser").value = "";
    document.getElementById("termsCheckbox").checked = false;
    p.style.color = "green";
    p.innerHTML = "Usuario registrado: " + users.map(u => u.username).join(", ");

  //REDIRECCIONAR AL LOGIN.
    setTimeout(function() {
        window.location.href = "index.html";
    }, 1500);

  //8. LIMPIA EL FEEDBACK VISUAL.
    const inputs = document.querySelectorAll('#signUpForm input[type="text"], #signUpForm input[type="email"], #signUpForm input[type="password"]');
    inputs.forEach(input => {
        input.classList.remove('input-valid', 'input-invalid');
    });
});
}

//VALIDACION DE LOS INPUTS
function validateInput(input, validateFn) {
    input.addEventListener('input', function() {
    if (validateFn(input.value)) {
        input.classList.remove('input-invalid');
        input.classList.add('input-valid');
    } else {
        input.classList.remove('input-valid');
        input.classList.add('input-invalid');
    }
    });
}

if(document.getElementById('firstNameNewUser')) {
validateInput(document.getElementById('firstNameNewUser'), v => v.trim().length > 0);
validateInput(document.getElementById('lastNameNewUser'), v => v.trim().length > 0);
validateInput(document.getElementById('emailNewUser'), v => {
    let trimmed = v.trim();
    return /^[^@]+@[^@]+\.[^@]+$/.test(trimmed) && !users.some(u => u.email === trimmed);
});
validateInput(document.getElementById('usernameNewUser'), v => {
    let trimmed = v.trim();
    return trimmed.length > 0 && !users.some(u => u.username === trimmed)
});
validateInput(document.getElementById('passwordNewUser'), v => v.trim().length >= 8);
validateInput(document.getElementById('confirmPasswordNewUser'), v => v.trim().length >= 8);
}

//------------------------LOGIN------------------------------------------------------------

if(document.getElementById('logInForm')){
document.getElementById('logInForm').addEventListener('submit', function (e) {
    e.preventDefault();//EVITA QUE SE RECARGUE LA PAGINA.

  //VARIABLES DE LA FUNCION.
    let logInUsername = document.getElementById("usernameLogIn").value.trim();
    let logInPassword = document.getElementById("passwordLogIn").value.trim();

  //1. VERIFICAR SI TODOS LOS CAMPOS ESTAN COMPLETOS.
    if (logInUsername === "" || logInPassword === "") {
        p.style.color = "red";
        p.innerHTML = "Completa Todos Los Campos.";
        return;
    } else {
        p.innerHTML = "";
    }

  //2. VERIFICAR SI EL USUARIO EXISTE.
    if (!users.some(u => u.username === logInUsername)) {
        p.style.color = "red";
        p.innerHTML = `El usuario ingresado no está registrado. Por favor verifica tu nombre de usuario o <a href="page1.html" style="color:#3264fe;">regístrate aquí</a>.`;
        document.getElementById("usernameLogIn").classList.add("input-invalid");
        setTimeout(() => {p.innerHTML = "" }, 4000); //LIMPIA EL MENSAJE.
        return;
    } else {
        p.innerHTML = "";
    }

  //3. VERIFICAR SI LA CONTRASEÑA ES CORRECTA.
    if (!users.some(u => u.username === logInUsername && u.password === logInPassword)) {
        p.style.color = "red";
        p.innerHTML = "Contraseña Incorrecta.";
        document.getElementById("passwordLogIn").value = "";
        return;
    } else {
        p.innerHTML = "";
    }

  //4. LIMPIAR INPUTS.
    document.getElementById("usernameLogIn").value = "";
    document.getElementById("passwordLogIn").value = "";
    p.style.color = "green";
    p.innerHTML = "Logeado: " + logInUsername;

  //5. LIMPIA EL FEEDBACK VISUAL.
    const inputs = document.querySelectorAll('#logInForm input[type="text"], #logInForm input[type="password"]');
    inputs.forEach(input => {
        input.classList.remove('input-valid', 'input-invalid');
    });
});
}

//-------------------------------------------FORGOT PASSWORD----------------------------------

//FUNCION PARA FORGOT PASSWORD.
if(document.getElementById('forgotPasswordLink')){
document.getElementById('forgotPasswordLink').addEventListener('click', function (e) {
    e.preventDefault();//EVITA QUE SE RECARGUE LA PAGINA.
    window.location.href = "page2.html";
    return false;
});
}

//GUARDAR NUEVA CONTRASEÑA.
if(document.getElementById('forgotPasswordForm')){
    const msg = document.getElementById('forgotPasswordMsg');
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(e){
    e.preventDefault();

    let username = document.getElementById("usernameForgotPassword").value.trim();
    let newPassword = document.getElementById("newPasswordForgotPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPasswordForgotPassword").value.trim();

    let userIndex = users.findIndex(u => u.username === username);

    // Validaciones
    if(username === "" || newPassword === "" || confirmPassword === ""){
        msg.style.color = "red";
        msg.innerText = "Completa todos los campos.";
        return;
    }

    if(userIndex === -1){
        msg.style.color = "red";
        msg.innerText = "El usuario no existe.";
        return;
    }

    if(newPassword.length < 8){
        msg.style.color = "red";
        msg.innerText = "La nueva contraseña debe tener al menos 8 caracteres.";
        return;
    }

    if(newPassword !== confirmPassword){
        msg.style.color = "red";
        msg.innerText = "Las contraseñas no coinciden.";
        return;
    }

    // CAMBIAR LA CONTRASEÑA Y GUARDAR.
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    msg.style.color = "green";
    msg.innerText = "Contraseña actualizada correctamente. Redirigiendo al login...";

    setTimeout(function(){
        window.location.href = "index.html";
    }, 1500);
    });
}

//ELIMINAR EL RESALTADO AL ESCRIBIR EN EL LOGIN.
if(document.getElementById("usernameLogIn")){
document.getElementById("usernameLogIn").addEventListener("input", function() {
    this.classList.remove("input-invalid");
});
}