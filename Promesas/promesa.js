function sumaPositivosAsync(a, b){
    let p = new Promise(function (resolve, reject){

        if( a > 0 && b >= 0){ // compruebo si los numeros son positivos
            resolve(a + b); // es la operación que quiero hacer
        }
        else{
            reject("Los números no son positivos.")
        }
    })
    return p;
}

console.log("Empieza");
console.log("Primera llamada a suma");

sumaPositivosAsync(5,10) // esto me devuelve una promesa
// hazme esta operación, entonces ok, catch no ok
.then(ok) // este es el resolve
.catch(error); // este es el reject

console.log("Segunda llamada a suma");

sumaPositivosAsync(5,-10) // esto me devuelve una promesa
// hazme esta operación, entonces ok, catch no ok
.then(ok) // este es el resolve
.catch(error); // este es el reject

console.log("Termina");

function ok(suma) {
    console.log(`la suma es ${suma}`);
}

function error(textoError) {
    console.log(`Jandemor: ${textoError}`);
}

