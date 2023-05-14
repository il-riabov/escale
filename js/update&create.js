import { setUser, updateUserByID,deleteUserById, getUserByID} from "./firebase.js";

let userSettings = localStorage.getItem("userSettings")

const title = document.querySelector(".chane")

const login = document.querySelector(".login")
const name = document.querySelector(".name")
const rate = document.querySelector(".rate")

const enterBtn = document.querySelector(".btn_rec")

const deleteBtn = document.querySelector(".reverse_btn")


if(userSettings){
  title.innerHTML = "Update info"
  getUserByID(userSettings).then(user => {
    login.value = user.login
    name.value = user.name
    rate.value = user.rate
  })

  enterBtn.addEventListener("click", ()=> {
    if( login.value.trim() != "" && name.value.trim() != "" && rate.value.trim() != ""){
      let data = {
        login: login.value.trim(),
        name: name.value.trim(),
        rate: rate.value.trim()
      }
      updateUserByID(userSettings, data).then(res => location.href = "../html/main_admin.html")
    }
    else{
      alert("Проверьте введённые данные")
    }
  })

  deleteBtn.addEventListener("click", () => {
    deleteUserById(userSettings).then(res => location.href = "../html/main_admin.html");
  })
}
else{
  title.innerHTML = "Create user"
  deleteBtn.style.display = "none"

  enterBtn.addEventListener("click", (e)=> {
    e.preventDefault()
    if( login.value.trim() != "" && name.value.trim() != "" && rate.value.trim() != ""){
      let data = {
        login: login.value.trim(),
        name: name.value.trim(),
        rate: rate.value.trim()
      }
      console.log(data)
      setUser(data).then(res => location.href = "../html/main_admin.html")
    }
    else{
      alert("Проверьте введённые данные")
    }
  })
}