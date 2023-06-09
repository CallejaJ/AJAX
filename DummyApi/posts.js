function post(pageSelected = 0){
    console.log("onload se ha llamado");
    let usersNumber = 15;
    const peticion = new XMLHttpRequest();

    peticion.onreadystatechange = function(){
        console.log(this.readyState);

        if(this.readyState == 4 && this.status === 200){
        console.log(this.responseText);
        
        const listaPost = JSON.parse(this.responseText);
        new ListaPost(listaPost.data).render()
        new Paginas(listaPost).render();
        console.log(listaPost.data);
        }
    }
    let url = `https://dummyapi.io/data/v1/post?page=${pageSelected}&limit=${usersNumber}`;
    peticion.open("GET", url, true);
    peticion.setRequestHeader("app-id", "6470cb07b1bb3876c0d9c81c");
    peticion.send();

}
console.log(this.responseText);

function ListaPost(listaPost){

    this.render = function(){

        let userPostDiv = document.getElementById("post");
        userPostDiv.innerHTML = "<ol>";

        for(let post of listaPost){
        
        userPostDiv.innerHTML += `<li><b>ID</b>:${post.id}</li>`;
        userPostDiv.innerHTML += `<li><b>Picture</b>:<img class="resize" src="${post.image}"></li> `;
        userPostDiv.innerHTML += `<li><b>Likes</b>: ${post.likes}</li> `;
        userPostDiv.innerHTML += `<li><b>Tags</b>: ${post.tags}</li> `;
        userPostDiv.innerHTML += `<li><b>Text</b>: ${post.text}</li> `;
        userPostDiv.innerHTML += `<li><b>Publish Date</b>: ${post.publishDate}</li>`;
        userPostDiv.innerHTML += `<li><b>Owner</b>: ${post.owner.title}</li>`;
        userPostDiv.innerHTML += `<li><b>Owner</b>: ${post.owner.firstName}</li>`;
        userPostDiv.innerHTML += `<li><b>Owner</b>: ${post.owner.lastName}</li>`;
            
            for(const tag of post.tags){
                userPostDiv.innerHTML += `<div><b>Tag</b>: <a href="tags.html?tags=${tag}">${tag}  </a></div><hr>`
            }
    }

        userPostDiv.innerHTML += "</ol>";
        userPostDiv.innerHTML += "</a>";
        }

    }

    function Tags(){

        let userTags = new URLSearchParams(window.location.search).get("tags");
        let tagsDiv = document.getElementById("tags");


        let peticionTags = new XMLHttpRequest();

        peticionTags.onreadystatechange = function(){
        console.log(this.readyState);

        if(this.readyState == 4 && this.status === 200){
        console.log(this.responseText);
        
        const listaPost = JSON.parse(this.responseText);
        new ListaPost(listaPost.data).render()
        new Paginas(listaPost).render();
        console.log(listaPost.data);
        }

        this.render = function(){
    
            let userPostDiv = document.getElementById("post");
            userPostDiv.innerHTML = "<ol>";
    
            for(let post of listaPost){
            
            userPostDiv.innerHTML += `<li><b>ID</b>:${post.id}</li>`;
            userPostDiv.innerHTML += `<li><b>Picture</b>:<img class="resize" src="${post.image}"></li> `;
            userPostDiv.innerHTML += `<li><b>Likes</b>: ${post.likes}</li> `;
            userPostDiv.innerHTML += `<li><b>Tags</b>: ${post.tags}</li> `;
            userPostDiv.innerHTML += `<li><b>Text</b>: ${post.text}</li> `;
            userPostDiv.innerHTML += `<li><b>Publish Date</b>: ${post.publishDate}</li>`;
            userPostDiv.innerHTML += `<li><b>Owner</b>: ${post.owner.title}</li>`;
            userPostDiv.innerHTML += `<li><b>Owner</b>: ${post.owner.firstName}</li>`;
            userPostDiv.innerHTML += `<li><b>Owner</b>: ${post.owner.lastName}</li>`;
            for(const tag of post.tags){
                userPostDiv.innerHTML += `<b>Tag</b>:<div><a href="tags.html?tags=${tag}">${tag}  </a></div>`
            }
        }
    
            userPostDiv.innerHTML += "</ol>";
            userPostDiv.innerHTML += "</a>";
            }
    
        }

    }

    function Paginas(listaUsuarios){
        this.listaUsuarios= listaUsuarios;
        this.render = function(){
            
            let paginacionDiv = document.getElementById("paginacion");
            let numeroPaginas = listaUsuarios.total / listaUsuarios.limit;
    
            paginacionDiv.innerHTML = "";
            for (let i = 1; i <= numeroPaginas; i++) {
            paginacionDiv.innerHTML += `<a href="#" onclick="post(${i})">${i}</a>, `;
            }
        }
        
    };
    