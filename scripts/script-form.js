
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            let isValid = true;
            
        const firstNameInput = document.getElementById("name");
        const firstNameError = document.getElementById("nameError");
        if (!firstNameInput.value.trim()) {
            firstNameError.textContent = "Este campo es obligatorio";
            firstNameInput.classList.add("error-border");
            isValid = false;
        } else {
            firstNameError.textContent = "";
            firstNameInput.classList.remove("error-border");
        }
        
        const lastNameInput = document.getElementById("lastname");
        const lastNameError = document.getElementById("lastnameError");
        if (!lastNameInput.value.trim()) {
            lastNameError.textContent = "Este campo es obligatorio";
            lastNameInput.classList.add("error-border");
            isValid = false;
        } else {
            lastNameError.textContent = "";
            lastNameInput.classList.remove("error-border");
        }
        if (!isValid) {
            event.preventDefault();
        } else {
            addButton.addEventListener("click", addStudent(event));
            //addStudent(event);
        }
    });
    
    // Eliminar la clase de error cuando el campo recibe foco
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            const errorInputs = form.querySelectorAll(".error-border");
            errorInputs.forEach((errorInput) => {
                errorInput.classList.remove("error-border");
                const errorElement = document.getElementById(`${errorInput.id}Error`);
                if (errorElement) {
                    errorElement.textContent = "";
                }
            });
        });
    });
}
});

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

//addButton.addEventListener("click", addStudent);
