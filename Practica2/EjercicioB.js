const productos = [
  { nombre: "Laptop", precio: 12000 },
  { nombre: "Mouse", precio: 250 },
  { nombre: "Teclado", precio: 750 },
  { nombre: "Monitor", precio: 3000 }
];

// Tu código aquí

//aqui filtramos los productos mayores a 1000
const filtrados = productos.filter(prodcto => prodcto.precio > 1000);


// aqui solo obtenemos los nombres
const nombres = filtrados.map(productos => productos.nombre);

console.log(nombres); // ["Laptop", "Monitor"]
