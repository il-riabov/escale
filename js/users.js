import { getUsers } from "./firebase.js";

const cardHolder = document.querySelector(".cnt_admin_main")

const newUser = document.querySelector(".btn_ma");

getUsers().then(users => {
  users.forEach(user => {
    let userLink = document.createElement("a")
    userLink.href = "info_poll.html"
    userLink.innerHTML = `
    <div class="card_pol">
        <div class="txt_admin_login">${user.login}</div>
        <div class="icons_admin_">
            <img src="../img/eye.png" alt="" class="icon_card" style="margin-right: 15px;">
            <a href="update_create.html" data-userId="${user.id}"><img src="../img/setting.png" alt="" class="icon_card" ></a>
        </div>
    </div>
    `
    userLink.addEventListener("click", () => {
      localStorage.setItem("user", JSON.stringify(user))
    })
    userLink.querySelector("[data-userId]").addEventListener("click", () => {
      localStorage.setItem("userSettings", user.id)
    })
    cardHolder.appendChild(userLink)
  })
})

newUser.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("userSettings");
  location.href = "../html/update_create.html"
})