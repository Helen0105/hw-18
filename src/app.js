


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('get-students-btn').addEventListener('click', getStudents);
  document.getElementById('add-student-form').addEventListener('submit', addStudent);

  document.querySelector("#students-table tbody").addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
      deleteStudent(id);
    }

    if (e.target.classList.contains("edit-btn")) {
     
      currentId = id; 
      const currentRow = e.target.closest("tr");
      const form = document.getElementById("add-student-form");
      
      form.elements[0].value = currentRow.children[1].textContent;
      form.elements[1].value = currentRow.children[2].textContent;
      form.elements[2].value = currentRow.children[3].textContent;
      form.elements[3].value = currentRow.children[4].textContent;
      form.elements[4].value = currentRow.children[5].textContent; 
      form.elements[5].checked = currentRow.children[6].textContent.trim() === "Так";
    }
  });
});

let currentId = null;

// Функція для отримання всіх студентів 
async function getStudents() {
  try {
    const response = await fetch("http://localhost:3000/students")
    const data = await response.json()
    renderStudents(data);
  } catch(error) {
    console.log(error);
  }
}

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
async function addStudent(e) {
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

  
  if (currentId) {
    try {
      await updateStudent(currentId, newStudent);
      getStudents();
      document.getElementById('add-student-form').reset();
      currentId = null;
      return;
    } catch (error) {
      console.log("Помилка");
      return;
    }
  }

  try {
    const response = await fetch("http://localhost:3000/students", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(newStudent) 
    });
    await response.json();
    document.getElementById('add-student-form').reset();
    getStudents();
  } catch (error) {
    console.log(error);
  }
}

// Функція для оновлення студента
async function updateStudent(id, data) {
  const options = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

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

  try {
    const res = await fetch(`http://localhost:3000/students/${id}`, options);
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("помилка в updateStudent:", error);
    throw error;
  }
} 

// Функція для видалення студента 
async function deleteStudent(id) {
  try {
    await fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE"
    });
    getStudents(); 
  } catch (error) {
    console.log(error);
  }
}