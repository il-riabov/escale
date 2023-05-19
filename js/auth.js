import { getUsers } from "./firebase.js";

const login = document.querySelector(".inp_aut");

const authBtn = document.querySelector(".chane");

authBtn.addEventListener("click", (e) => {
  if (login.value == "admin") {
    location.href = "html/main_admin.html";
  }
  else if (login.value == "") {
    alert("the field must not be empty")
  }
  else {
    e.preventDefault()
    getUsers().then(users => {
      for(let user of users){
        if(user.login === login.value){
          location.href = "html/main_pol.html";
          login.value = "";
          console.log(user)
          localStorage.setItem("user", JSON.stringify(user))
          break;
        }
        else {
          alert("user is not found")
          login.value = "";
        }
      }
    })
  }
})
