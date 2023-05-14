import { getItems, deleteItemById } from "./firebase.js"

const user = JSON.parse(localStorage.getItem("user"))

const login = document.querySelector(".chane")
const userName = document.querySelector(".userName")
const userRate = document.querySelector(".userRate")
const userMoney = document.querySelector(".userMoney")

const itemsWrapper = document.querySelector(".cnt_inf_description")

login.innerHTML = user.login
userName.innerHTML = user.name
userRate.innerHTML = user.rate
console.log()
getItems().then(items => {
  let money = 0;
  items.forEach(item => {
    if(item.projectAuthor == user.id){
      let dcr_block = document.createElement("div")
      dcr_block.classList.add("dcr_block")
      dcr_block.innerHTML += `
      <div class="wrapper_dcr_block">
        <div class="dcr_txt"><span class="backlight">date:</span> ${item.projectDate}</div>
        <div class="dcr_txt"><span class="backlight">object:</span> ${item.projectName}</div>
        <div class="dcr_txt"><span class="backlight">time: </span> ${item.projectTime.split(":")[0]} hours ${item.projectTime.split(":")[1]} minutes</div>
        <div class="dcr_txt"><span class="backlight">rate: </span> ${item.projectRate}$</div>
        <div class="dcr_txt"><span class="backlight">received: </span> ${item.projectProfit}$</div>
        </div>
      <div class="btn_delete" data-id ="${item.id}">delete date</div>
      `
      let delBtn = dcr_block.querySelector(".btn_delete")
      delBtn.addEventListener("click", (e) => {
        deleteItemById(e.target.dataset.id).then(res => {
          userMoney.innerHTML -= (+item.projectProfit).toFixed(2)
          e.target.closest(".dcr_block").remove()
        })
      })
      money += (+item.projectProfit)
      itemsWrapper.appendChild(dcr_block)
    }
  })
  return money
}).then(money => userMoney.innerHTML = (+money).toFixed(2))