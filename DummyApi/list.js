    function list(pageSelected = 0){
    console.log("onload se ha llamado");

    let usersNumber = 10;
    const peticion = new XMLHttpRequest();

        peticion.onreadystatechange = function(){
        console.log(this.readyState);
        
        if(this.readyState === 4 && this.status === 200){
        console.log(this.responseText);
        
        const listaUsuarios = JSON.parse(this.responseText);
        new ListaUsuarios(listaUsuarios.data).render();
        new Paginas(listaUsuarios).render();
        console.log(listaUsuarios.data);
        }
    }
        let url = `https://dummyapi.io/data/v1/user?page=${pageSelected}&limit=${usersNumber}`;
        peticion.open("GET", url, true);
        peticion.setRequestHeader("app-id", "6470cb07b1bb3876c0d9c81c");
        peticion.send();
    }


console.log(this.responseText);

function ListaUsuarios(listaUsuarios){
    // this.listaUsuarios = listaUsuarios;
    this.render = function(){

        let listaUsuariosDiv = document.getElementById("listaUsuarios");
        listaUsuariosDiv.innerHTML = "<ol>";

        for(let usuario of listaUsuarios){
        listaUsuariosDiv.innerHTML += `<li><img class="resize" src="${usuario.picture}"></li>`;
        listaUsuariosDiv.innerHTML += `<li> ${usuario.title} ${usuario.firstName} ${usuario.lastName}</li>`;
        listaUsuariosDiv.innerHTML += "<li><a href='detalle.html?id=" + usuario.id + "'>More details";
    }
        
    };

}

    function Paginas(listaUsuarios){
    this.listaUsuarios= listaUsuarios;
    this.render = function(){
        
        let paginacionDiv = document.getElementById("paginacion");
        let numeroPaginas = listaUsuarios.total / listaUsuarios.limit;

        paginacionDiv.innerHTML = "";
        for (let i = 1; i <= numeroPaginas; i++) {
        paginacionDiv.innerHTML += `<a href="#" onclick="list(${i})">${i}</a>, `;
        }
    }
    
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
            <img class="resize" src="${usuario.picture}"> 
            </p>
            <p>
            <b>ID</b>:${usuario.id}
            </p>
            <p>
            <b>Details</b>: ${usuario.title.toUpperCase()}.${usuario.firstName} ${usuario.lastName}
            </p>
            <p>
            <b>Gender</b>: ${usuario.gender}
            </p>
            <p>
            <b>Date of birth</b>: ${usuario.dateOfBirth}
            </p>
            <p>
            <b>Register Date</b>: ${usuario.registerDate}
            </p>
            <p>
            <b>Email</b>: ${usuario.email}
            <p>
            <b>Phone</b>: ${usuario.phone}
            </p>
            <p>
            <b>State:</b> ${usuario.location.state}
            </p>
            <p>
            <b>Street:</b> ${usuario.location.street}
            </p>
            <p>
            <b>City:</b> ${usuario.location.city}
            </p>
            <p>
            <b>Country:</b> ${usuario.location.country}
            </p>
            <p>
            <b>Timezone:</b> ${usuario.location.timezone}
            </p>`
        
        }
    };

    let url = `https://dummyapi.io/data/v1/user/${userID}`;
    peticionDetalles.open("GET", url, true);
    peticionDetalles.setRequestHeader("app-id", "6470cb07b1bb3876c0d9c81c");
    peticionDetalles.send();
}






