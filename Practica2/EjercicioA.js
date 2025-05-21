const persona = {
  nombre: "Laura Daniela",
  edad: 25,
  direccion: {
    ciudad: "Qro",
    pais: "MX"
  }
};

// Aplica desestructuración aquí
const {nombre, edad, direccion: {ciudad}} =persona;

// Imprime el mensaje
console.log(`Mi nombre es ${nombre}, tengo ${edad} años y vivo en ${ciudad}.`);
