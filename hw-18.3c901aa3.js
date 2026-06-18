function t(){fetch("http://localhost:3000/students").then(t=>t.json()).then(t=>{var e;let n;e=t,(n=document.querySelector("#students-table tbody")).innerHTML="",e.forEach(t=>{let e=document.createElement("tr");e.innerHTML=`
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills.join(", ")}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"Так":"Ні"}</td>
      <td>
        <button class="edit-btn" data-id="${t.id}">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button class="delete-btn" data-id="${t.id}">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>`,n.appendChild(e)})}).catch(t=>console.log(t))}function e(e){e.preventDefault();let n=document.getElementById("name").value,d=Number(document.getElementById("age").value),o=document.getElementById("course").value,l=document.getElementById("email").value,s=document.getElementById("isEnrolled").checked;fetch("http://localhost:3000/students",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,age:d,course:o,skills:document.getElementById("skills").value.split(",").map(t=>t.trim()),email:l,isEnrolled:s})}).then(t=>t.json()).then(()=>{document.getElementById("add-student-form").reset(),t()}).catch(t=>console.log(t))}document.addEventListener("DOMContentLoaded",()=>{document.getElementById("get-students-btn").addEventListener("click",t),document.getElementById("add-student-form").addEventListener("submit",e),document.querySelector("#students-table tbody").addEventListener("click",e=>{var n,d;let o,l=e.target.dataset.id;e.target.classList.contains("delete-btn")&&(n=l,fetch(`http://localhost:3000/students/${n}`,{method:"DELETE"}).then(()=>{t()}).catch(t=>console.log(t))),e.target.classList.contains("edit-btn")&&(d=l,(o=prompt("Введіть новий курс для студента"))&&fetch(`http://localhost:3000/students/${d}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({course:o})}).then(()=>{t()}).catch(t=>console.log(t)))})});
//# sourceMappingURL=hw-18.3c901aa3.js.map
