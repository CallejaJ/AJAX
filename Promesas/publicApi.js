const promesa = fetch("https://api.publicapis.org/entries"); // estamos llamando a una API

promesa.then ((result) => {
    result.json()
    .then((response) => {
    console.log(response);
    })
    .catch ((error) => {
        console.log(error);
    })
}).catch((error) => {
    console.log(error);
});


// lo de arriba se puede resumir de la siguiente manera

const otraPromesa = fetch("https://api.publicapis.org/entries");

otraPromesa
.then((result) => result.json()) // sacar los resultados en json
.then((response) => result.json(response)) // para que me de la respuesta por consola 
.catch((error) => console.log(error))
