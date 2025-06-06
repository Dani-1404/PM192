//importamos la funcion para poder hacer las pruebas
import { restar } from './utils.js';

console.log(restar(20, 2)); 
console.log(restar(30, 10)); 
console.log(restar(15, 12));  



//EJERCICIO B
function verificarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        if (usuario === "admin") {
            resolve("Acceso concedido");
        } else {
            reject("Acceso denegado");
        }
    });
}

verificarUsuario("admin")
    .then(mensaje => console.log("Resultado admin:", mensaje))
    .catch(error => console.error("Error admin:", error));

verificarUsuario("usuario123")
    .then(mensaje => console.log("Resultado usuario123:", mensaje))
    .catch(error => console.error("Error usuario123:", error));




//ejercicio C
function obtenerDatos() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos obtenidos de la API");
        }, 2000); // espera 2 segundos
    });
}

async function mostrarDatos() {
    console.log("Esperando datos...");
    const resultado = await obtenerDatos();
    console.log(resultado);
}

mostrarDatos();

