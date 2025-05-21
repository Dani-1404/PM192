const personas = [
  { nombre: "Ana", edad: 22 },
  { nombre: "Luis", edad: 35 },
  { nombre: "María", edad: 28 }
];

// Buscar a Luis
const luis = personas.find(p => p.nombre === "Luis");
console.log(luis);

// Mostrar cada nombre con edad
personas.forEach(p => {
  console.log(`${p.nombre} tiene ${p.edad} años.`);
});

// Sumar todas las edades
const totalEdades = personas.reduce((acum, p) => acum + p.edad, 0);
console.log(`La suma total de las edades es: ${totalEdades}`);
