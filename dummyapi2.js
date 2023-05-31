function inicializar2(){
    
    // vamos a crear un nuevo objeto-llamada
    let peticion = new XMLHttpRequest();
    /** Use XMLHttpRequest (XHR) objects to interact with servers. You can retrieve data from a URL without having to do a full page refresh. 
     * This enables a Web page to update just part of a page without disrupting what the user is doing. */
    
    // Creamos una promesa visible fuera del método
    let promesa;
    
    peticion.onreadystatechange = function(){
        let state = this.readyState;
        let status = this.status;
        let response = this.responseText; // valor esperado
        promesa = new Promise(function(resolve, reject){
            // el estado listo es 4 pero no sé si ha terminado
            if(state == 4 &&  status == 200){
                resolve(response);
            } else if (state == 4){
                reject("check error:  ");
            }
        });
        promesa.then(response => imprimirConsola(response)).catch(error);
    }
    
    peticion.open("GET", "https://dummyapi.io/data/v1/user?limit=10");
    peticion.setRequestHeader("app-id", "6470cb07b1bb3876c0d9c81c");
    peticion.send();
}

function imprimirConsola(response){
    console.log(response);
    let usuarios = JSON.parse(response);
    let listaUsuariosDiv = document.getElementById("lista-ultimos-usuarios");
    listaUsuariosDiv.innerHTML = "<li>Foto, Titulo, Nombre, Apellidos</li>"

    for(const usuario of usuarios.data){
        listaUsuariosDiv += "<li><a href='usuario.html?id=" + usuario.id + "'>" +
        "<img width='100' height='60' " + "src=' " + usuario.picture + "'/></a>" +
        usuario.title + "," + usuario.firstName + ", " + usuario.lastName + "</li>";
    }

}

    function error(textoError){
        let listaUsuariosDiv = document.getElementById("lista-ultimos-usuarios");
        listaUsuariosDiv.innerHTML = textoError;
    }

    function initUsersDetails(){
        let userID = new URLSearchParams(window.location.search).get("id");
        let userDetails = document.getElementById("usersDetails");
        let peticionDetalles = new XMLHttpRequest();

        peticionDetalles.onreadystatechange = function(){
            if(this.readyState == 4 & this.status == 200){
                let usuario = JSON.parse(this.responseText);
                console.log("usuario");
                userDetails.innerHTML = 
                `<p>
                <img src="${usuario.picture}"> 
                </p>
                <p>
                ID:${usuario.id}
                Details: ${usuario.title.toUpperCase()}. ${usuario.firstName} ${usuario.lastName}
                Gender: ${usuario.gender}
                Date of birth: ${usuario.dateOfBirth}
                Register Date: ${usuario.registerDate}
                </p>
                <p>
                Email: ${usuario.email}
                Phone: ${usuario.phone}
                </p>
                <p>
                <b>Address</b></br>
                <b>State:</b> ${usuario.location.state}<br/>
                <b>Street:</b> ${usuario.location.street}<br/>
                <b>City:</b> ${usuario.location.city}</br>
                <b>Country:</b> ${usuario.location.country}<br/>
                <b>Timezone:</b> ${usuario.location.timezone}<br/>
                </p>`
            
            }
        };

        let url = `https://dummyapi.io/data/v1/user/${userID}`;
        peticionDetalles.open("GET", url, true);
        peticionDetalles.setRequestHeader("app-id", "6470cb07b1bb3876c0d9c81c");
        peticionDetalles.send();
    }






