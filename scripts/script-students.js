let students = JSON.parse(localStorage.getItem("students")) || [];

const buttonBack = document.querySelector(".add-button");

buttonBack.addEventListener("click",()=>{
    window.location = "form_student.html";
});

/* let students = [
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
]; */

const selectElement = document.getElementById("numero-items");
// Asignamos un event listener para capturar el cambio
selectElement.addEventListener("change", (event) => {
  limit = parseInt(event.target.value); // Actualizamos la variable 'límite'
  updateArrayStudents();
  nextPage(0);
});

let limit = 5;
let from = 0;
let pages = 0;
let activePage = 1;

const arrayInt = () => {
  let arrayIntermediate = [];
  students.forEach((st) => {
    if (st.visible) {
      arrayIntermediate.push(st);
    }
  });
  return arrayIntermediate;
};

let arrayIntermediate = arrayInt();
let array = arrayIntermediate.slice(from, limit);

const renderStudents = () => {
  visibleStudents = 0;
  //students.forEach((st) => (st.visible = true));
  students.forEach((st) => {
    if (st.visible) {
      visibleStudents += 1;
    }
  });
  const tbody = document.getElementById("student_table");
  if (!tbody) return;
  tbody.innerHTML = "";
  console.log(`Longitud del array: ${array.length}`);
  if (array.length != 0) {
    array.map(({ id, name, lastname, visible }) => {
      if (visible) {
        const row = document.createElement("tr");
        const content = `<td>${id}</td><td>${name}</td><td>${lastname}</td>`;
        row.innerHTML = content;
        tbody.append(row);
      } else {
        const row = document.createElement("tr");
        const content = `<td>${""}</td><td>${""}</td><td>${""}</td>`;
        row.innerHTML = content;
        tbody.append(row);
      }
    });
    if (array.length % 5 != 0) {
      for (let i = 0; i < limit - array.length; i++) {
        const row = document.createElement("tr");
        const content = `<td>${""}</td><td>${""}</td><td>${""}</td>`;
        row.innerHTML = content;
        tbody.append(row);
      }
    }
  } else {
    const alert = document.createElement("h4");
    const search = document.querySelector(".search");
    const thead = document.querySelector(".table-head");
    const nav = document.querySelector(".container-nav");
    alert.innerHTML = "No hay alumnos cargados";
    search.style.display = "none";
    thead.style.display = "none";
    nav.style.display = "none";
    tbody.append(alert);
    return;
  }
  renderStudentsPagination();
};

const renderStudentsPagination = () => {
  document.getElementById("items").innerHTML = "";
  console.log(visibleStudents);
  let index = activePage > 4 ? activePage - 4 : 0;
  let limitante = index + 5;
  pages = visibleStudents / limit;
  console.log(pages);

  switch (true) {
    case Math.ceil(pages) < 5:
      //console.log("Dentro del caso 1");
      index = 0;
      limitante = Math.ceil(pages);
      break;

    case activePage > Math.round(pages):
      //console.log("Dentro del caso 2");
      limitante = Math.round(pages) + 1;
      index = activePage > 5 ? activePage - 5 : 0;
      break;

    case activePage == pages:
      //console.log("Dentro del caso 3");
      limitante = pages;
      index = activePage > 5 ? activePage - 5 : 0;
      break;

    case limitante > Math.ceil(pages):
      //console.log(`limit ${limitante}, pagina: ${pages}`);
     //console.log("Dentro del caso 4");
      index -= 1;
      limitante -= 1;
      break;

    default:
      break;
  }

  for (index; index < limitante; index++) {
    const item = document.createElement("li");
    item.classList = `${activePage == index + 1 ? "active" : ""}`;
    const enlace = `<button class="button-nav" onclick="nextPage(${index})">${
      index + 1
    }</button>`;
    item.innerHTML = enlace;
    document.querySelector("#items").append(item);
  }
};

window.nextPage = (pagina) => {
  activePage = pagina + 1;
  from = limit * pagina; //5
  if (from <= arrayIntermediate.length) {
    updateArrayStudents();
  }
};
const updateArrayStudents = () => {
  array = arrayIntermediate.slice(from, limit * activePage);
  renderStudents();
};

const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  
  const searchInput = document.querySelector("#lastname").value.trim().toLowerCase(); // Obtén el valor del input
  
  students.forEach(st => st.visible = true);

  if (searchInput === "") {
    //console.log("Restaurar array original");
    arrayIntermediate = arrayInt(); // Restauramos el array original
    array = arrayIntermediate.slice(from, limit); // Actualizamos el array con la paginación original
  } else {
    // Buscamos las coincidencias
    students.forEach((st) => {
      if (!st.lastname.toLowerCase().includes(searchInput)) {
        st.visible = false;
      }
    });

    // Ordenamos el array visible
    arrayIntermediate.sort((a, b) => b.visible - a.visible);
    array = arrayIntermediate.slice(from, limit * activePage); // Asignamos los elementos al array paginado
  }
  
  renderStudents();
  nextPage(0);
});

renderStudents();


