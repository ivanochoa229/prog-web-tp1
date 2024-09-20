//let students = JSON.parse(localStorage.getItem("students")) || [];

let students = [
  { name: "Ivan", lastName: "Ochoa", legajo: 57479, visible: true },
  { name: "Ana", lastName: "Gómez", legajo: 57480, visible: true },
  { name: "Luis", lastName: "Pérez", legajo: 57481, visible: true },
  { name: "María", lastName: "Rodríguez", legajo: 57482, visible: true },
  { name: "Juan", lastName: "López", legajo: 57483, visible: true },
  { name: "Carlos", lastName: "Martínez", legajo: 57484, visible: true },
  { name: "Lucía", lastName: "Fernández", legajo: 57485, visible: true },
  { name: "Sofía", lastName: "Torres", legajo: 57486, visible: true },
  { name: "Diego", lastName: "Ruiz", legajo: 57487, visible: true },
  { name: "Laura", lastName: "Jiménez", legajo: 57488, visible: true },
  { name: "Miguel", lastName: "Hernández", legajo: 57489, visible: true },
  { name: "Paula", lastName: "Castro", legajo: 57490, visible: true },
  { name: "Andrés", lastName: "Morales", legajo: 57491, visible: true },
  { name: "Valeria", lastName: "Ortiz", legajo: 57492, visible: true },
  { name: "Fernando", lastName: "Rojas", legajo: 57493, visible: true },
  { name: "Mónica", lastName: "Ramírez", legajo: 57494, visible: true },
  { name: "Javier", lastName: "Vargas", legajo: 57495, visible: true },
  { name: "Camila", lastName: "Flores", legajo: 57496, visible: true },
  { name: "Oscar", lastName: "Sánchez", legajo: 57497, visible: true },
  { name: "Daniela", lastName: "Castillo", legajo: 57498, visible: true },
  { name: "Pedro", lastName: "Mendoza", legajo: 57499, visible: true },
  { name: "Elena", lastName: "Silva", legajo: 57500, visible: true },
  { name: "Tomás", lastName: "Vega", legajo: 57501, visible: true },
  { name: "Adriana", lastName: "Navarro", legajo: 57502, visible: true },
  { name: "Ramón", lastName: "Carrillo", legajo: 57503, visible: true },
  { name: "Gabriela", lastName: "Sosa", legajo: 57504, visible: true },
  { name: "Raúl", lastName: "Delgado", legajo: 57505, visible: true },
  { name: "Clara", lastName: "Paredes", legajo: 57506, visible: true },
  { name: "Francisco", lastName: "Reyes", legajo: 57507, visible: true },
  { name: "Patricia", lastName: "Guzmán", legajo: 57508, visible: true },
  { name: "Alejandro", lastName: "Mora", legajo: 57509, visible: true },
  { name: "Isabel", lastName: "Ortiz", legajo: 57510, visible: true },
  { name: "Felipe", lastName: "Peña", legajo: 57511, visible: true },
  { name: "Rosa", lastName: "Vargas", legajo: 57512, visible: true },
  { name: "Ignacio", lastName: "Luna", legajo: 57513, visible: true },
  { name: "Julia", lastName: "Cruz", legajo: 57514, visible: true },
  { name: "Esteban", lastName: "Suárez", legajo: 57515, visible: true },
  { name: "Carolina", lastName: "Pinto", legajo: 57516, visible: true },
  { name: "Alberto", lastName: "Esquivel", legajo: 57517, visible: true },
  { name: "Natalia", lastName: "Ibarra", legajo: 57518, visible: true },
  { name: "Ivan", lastName: "Ochoa", legajo: 57479, visible: true },
];

const selectElement = document.getElementById("numero-items");
// Asignamos un event listener para capturar el cambio
selectElement.addEventListener("change", (event) => {
  limite = parseInt(event.target.value); // Actualizamos la variable 'límite'
  modificarArregloProductos();
});

let limite = 5;
let desde = 0;
let paginas = 0;
let paginaActiva = 1;

const arregloInt = () => {
  let arregloIntermedio = [];
  students.forEach((st) => {
    if (st.visible) {
      arregloIntermedio.push(st);
    }
  });
  return arregloIntermedio;
};

let arregloIntermedio = arregloInt();
let arreglo = arregloIntermedio.slice(desde, limite);

const cargarAlumnos = () => {
  alumnosVisibles = 0;
  //students.forEach((st) => (st.visible = true));
  students.forEach((st) => {
    if (st.visible) {
      alumnosVisibles += 1;
    }
  });
  const tbody = document.getElementById("student_table");
  if (!tbody) return;
  tbody.innerHTML = "";
  if (arreglo.length != 0) {
    arreglo.map(({ legajo, name, lastName, visible }) => {
      if (visible) {
        const fila = document.createElement("tr");
        const contenido = `<td>${legajo}</td><td>${name}</td><td>${lastName}</td>`;
        fila.innerHTML = contenido;
        tbody.append(fila);
      } else {
        const fila = document.createElement("tr");
        const contenido = `<td>${""}</td><td>${""}</td><td>${""}</td>`;
        fila.innerHTML = contenido;
        tbody.append(fila);
      }
    });
    if (arreglo.length % 5 != 0) {
      for (let i = 0; i < limite - arreglo.length; i++) {
        const fila = document.createElement("tr");
        const contenido = `<td>${""}</td><td>${""}</td><td>${""}</td>`;
        fila.innerHTML = contenido;
        tbody.append(fila);
      }
    }
  } else {
    const alert = document.createElement("h4");
    alert.innerHTML = "No hay alumnos cargados";
    tbody.append(alert);
    return;
  }
  cargarAlumnosPaginacion();
};

const cargarAlumnosPaginacion = () => {
  document.getElementById("items").innerHTML = "";
  //console.log(alumnosVisibles);
  let index = paginaActiva > 4 ? paginaActiva - 4 : 0;
  let limitante = index + 5;
  paginas = alumnosVisibles / limite;
  console.log(paginas);

  switch (true) {
    case Math.ceil(paginas) < 5:
      console.log("Dentro del caso 1");
      index = 0;
      limitante = Math.ceil(paginas);
      break;

    case paginaActiva > Math.round(paginas):
      console.log("Dentro del caso 2");
      limitante = Math.round(paginas) + 1;
      index = paginaActiva > 5 ? paginaActiva - 5 : 0;
      break;

    case paginaActiva == paginas:
      console.log("Dentro del caso 3");
      limitante = paginas;
      index = paginaActiva > 5 ? paginaActiva - 5 : 0;
      break;

    case limitante > Math.ceil(paginas):
      console.log(`Limite ${limitante}, pagina: ${paginas}`);
      console.log("Dentro del caso 4");
      index -= 1;
      limitante -= 1;
      break;

    default:
      console.log("limitante", limitante);
      console.log("ceil", Math.ceil(paginas));
      console.log("round", Math.round(paginas));
      console.log("activa", paginaActiva);
      console.log("paginas", paginas);
      console.log("No se cumple ninguna condición");
      break;
  }

  for (index; index < limitante; index++) {
    const item = document.createElement("li");
    item.classList = `${paginaActiva == index + 1 ? "active" : ""}`;
    const enlace = `<button onclick="pasarPagina(${index})">${
      index + 1
    }</button>`;
    item.innerHTML = enlace;
    document.querySelector("#items").append(item);
  }
};

window.pasarPagina = (pagina) => {
  paginaActiva = pagina + 1;
  desde = limite * pagina; //5
  if (desde <= arregloIntermedio.length) {
    modificarArregloProductos();
  }
};
const modificarArregloProductos = () => {
  arreglo = arregloIntermedio.slice(desde, limite * paginaActiva);
  cargarAlumnos();
};

cargarAlumnos();

// const contenido = `<td>${legajo}</tf><td>${name}</td><td>${lastName}</td>`;
