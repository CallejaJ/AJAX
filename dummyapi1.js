    function inicializar(){
    console.log("on load se ha llamado");

    let usersNumber = 10;
    const http = new XMLHttpRequest();

        http.onreadystatechange = function(){
    console.log(this.readyState);
    if(this.readyState === 4 && this.status === 200){

        console.log(this.responseText);
        const listaUsuarios = JSON.parse(this.responseText);
        new ListaUsuarios(listaUsuarios.data).render();
        }
    }
        http.open("GET", `https://dummyapi.io/data/v1/user?limit=${usersNumber}&page=1`);
        http.setRequestHeader("app-id", "6470cb07b1bb3876c0d9c81c");
        http.send();
    }


console.log(this.responseText);

function ListaUsuarios(listaUsuarios){
    // this.listaUsuarios = listaUsuarios;
    this.render = function(){

        let listaUsuariosDiv = document.getElementById("listaUsuarios");
        // let paginationElement = document.getElementById("paginacion")
        listaUsuariosDiv.innerHTML = "<ol>";

        for(let usuario of listaUsuarios){
        listaUsuariosDiv.innerHTML += `<li><img class="resize" src="${usuario.picture}"></li>`;
        listaUsuariosDiv.innerHTML += `<li> ${usuario.title} ${usuario.firstName} ${usuario.lastName}</li>`;
        listaUsuariosDiv.innerHTML += "<li><a href='dummyapi_detalle.html?id=" + usuario.id + "'>More details";
    }
        listaUsuariosDiv.innerHTML += "</ol>";
        listaUsuariosDiv.innerHTML += "</a>";
    };
    // let paginacion = "";
    // let usuarios = 0;
    // for (let i = 1; i <= usuarios.total / usuarios.limit; i++) {
    //     paginacion += `<a href="#" onclick="init(${i})">${i}</a>, `;
    // }

    // let ultimaPagina = parseInt(usuarios.total / usuarios.limit) + 1;
    // paginacion += `<a href="#" onclick="init(${ultimaPagina})">${ultimaPagina}</a>`;

    // paginationElement.innerHTML = paginacion;
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






