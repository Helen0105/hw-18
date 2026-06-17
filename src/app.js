document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('get-students-btn').addEventListener('click', getStudents);
  document.getElementById('add-student-form').addEventListener('submit', addStudent);
})





// Функція для отримання всіх студентів

function getStudents() {


fetch("http://localhost:3000/students")
.then(response => response.json())
.then(post => console.log(post))
.catch(error => console.log(error));



 }

getStudents()



// Функція для відображення студентів у таблиці

function renderStudents(students) {

 // твій код

 

}



// Функція для додавання нового студента

function addStudent(e) {

 // твій код

  

}



// Функція для оновлення студента

function updateStudent(id) {

 // твій код



 }



// Функція для видалення студента

function deleteStudent(id) {

    // твій код

}