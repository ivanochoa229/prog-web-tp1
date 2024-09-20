const backButton = document.querySelector(".back-button");
const addButton = document.querySelector(".add-student-button");
let students = JSON.parse(localStorage.getItem("students")) || [];

backButton.addEventListener("click", () => {

    window.location = "students.html";
});

const addStudent = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const visible = true;
    console.log(students.at(-1));
    const id = generateId();
    students.push({ id, name, lastname, visible });
    localStorage.setItem("students", JSON.stringify(students));
    students.forEach(element => {
        console.log(element);
    });
    window.location.href = "students.html";
    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
}

const generateId = () => {
    let id;
    if (students.length === 0) {
        id = 1;
    }
    else {
        //console.log(students.at(-1));
        id = students.at(-1).id + 1;
    }
    return id;
};

addButton.addEventListener("click", addStudent);
