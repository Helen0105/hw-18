// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('get-students-btn').addEventListener('click', getStudents);
//   document.getElementById('add-student-form').addEventListener('submit', addStudent);
//   document.querySelector("#students-table tbody").addEventListener("click", (e) => {
//     const id = e.target.dataset.id;

//     if (e.target.classList.contains("delete-btn")){
//       deleteStudent(id);}



// if (e.target.classList.contains("edit-btn")) {
//       updateStudent(id); 
//     }

//   })
// })





// // Функція для отримання всіх студентів

// function getStudents() {


// fetch("http://localhost:3000/students")
// .then(response => response.json())
// .then(data => {
// renderStudents(data);
// })
// .catch(error => console.log(error));
// }





// // Функція для відображення студентів у таблиці

// function renderStudents(students) {

// const tbody = document.querySelector("#students-table tbody");
// tbody.innerHTML = "";
// students.forEach(student => {
//   const row = document.createElement('tr');
//   row.innerHTML = `
//   <td>${student.id}</td>
// <td>${student.name}</td>
// <td>${student.age}</td>
// <td>${student.course}</td>
// <td>${student.skills.join(", ")}</td>
// <td>${student.email}</td>
// <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
//       <td>
//         <button class="edit-btn" data-id="${student.id}">Оновити</button>
//         <button class="delete-btn" data-id="${student.id}">Видалити</button>
//       </td>`;
//       tbody.appendChild(row)
// })

 

// }






// function addStudent(e) {
//   e.preventDefault(); 
  
//   const nameValue = document.getElementById("name").value;
//   const ageValue = Number(document.getElementById("age").value);
//   const courseValue = document.getElementById('course').value;
//   const emailValue = document.getElementById('email').value;
//   const isEnrolledValue = document.getElementById('isEnrolled').checked;
//   const skillsValue = document.getElementById('skills').value.split(',').map(s => s.trim());


//   const newStudent = {
//     name: nameValue,
//     age: ageValue,
//     course: courseValue,
//     skills: skillsValue,
//     email: emailValue,
//     isEnrolled: isEnrolledValue
//   };

//   fetch("http://localhost:3000/students", {
//     method: "POST", 
//     headers: {
//       "Content-Type": "application/json" 
//     },
//     body: JSON.stringify(newStudent) 
//   })
//   .then(response => response.json())
//   .then(() => {
    
//     document.getElementById('add-student-form').reset();
    
   
//     getStudents();
//   })
//   .catch(error => console.log(error));
// }



// // Функція для оновлення студента

// function updateStudent(id) {
//   const newCourse = prompt("Введіть новий курс для студента");


//   const updatedData = {
//     course: newCourse
//   };

//   fetch(`http://localhost:3000/students/${id}`, {
//     method: "PATCH", 
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(updatedData)
//   })
//   .then(() => {
//     getStudents(); 
//   })
//   .catch(error => console.log(error));
// } 




// // Функція для видалення студента

// function deleteStudent(id) {
// fetch(`http://localhost:3000/students/${id}`, {
//   method: "DELETE"
// })


// .then(() => {
//     getStudents(); 
//   })

// }












document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('get-students-btn').addEventListener('click', getStudents);
  document.getElementById('add-student-form').addEventListener('submit', addStudent);

  // Слухач кліків для кнопок "Оновити" та "Видалити" у таблиці
  document.querySelector("#students-table tbody").addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
      deleteStudent(id);
    }

    if (e.target.classList.contains("edit-btn")) {
      updateStudent(id); 
    }
  });
});

// Функція для отримання всіх студентів
function getStudents() {
  fetch("http://localhost:3000/students")
    .then(response => response.json())
    .then(data => {
      renderStudents(data);
    })
    .catch(error => console.log(error));
}

// Функція для відображення студентів у таблиці
function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? 'Так' : 'Ні'}</td>
      <td>
        <button class="edit-btn" data-id="${student.id}">Оновити</button>
        <button class="delete-btn" data-id="${student.id}">Видалити</button>
      </td>`;
    tbody.appendChild(row);
  });
}

// Функція для додавання нового студента
function addStudent(e) {
  e.preventDefault(); 
  
  const nameValue = document.getElementById("name").value;
  const ageValue = Number(document.getElementById("age").value);
  const courseValue = document.getElementById('course').value;
  const emailValue = document.getElementById('email').value;
  const isEnrolledValue = document.getElementById('isEnrolled').checked;
  const skillsValue = document.getElementById('skills').value.split(',').map(s => s.trim());

  const newStudent = {
    name: nameValue,
    age: ageValue,
    course: courseValue,
    skills: skillsValue,
    email: emailValue,
    isEnrolled: isEnrolledValue
  };

  fetch("http://localhost:3000/students", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(newStudent) 
  })
  .then(response => response.json())
  .then(() => {
    document.getElementById('add-student-form').reset();
    getStudents();
  })
  .catch(error => console.log(error));
}

// Функція для оновлення студента (PATCH)
function updateStudent(id) {
  const newCourse = prompt("Введіть новий курс для студента");
  if (!newCourse) return; // Якщо користувач скасував або нічого не ввів

  const updatedData = {
    course: newCourse
  };

  fetch(`http://localhost:3000/students/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedData)
  })
  .then(() => {
    getStudents(); 
  })
  .catch(error => console.log(error));
} 

// Функція для видалення студента (DELETE)
function deleteStudent(id) {
  fetch(`http://localhost:3000/students/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    getStudents(); 
  })
  .catch(error => console.log(error));
}