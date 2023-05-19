import { setItem } from "./firebase.js";

const user = JSON.parse(localStorage.getItem("user"))

const projectName = document.querySelector(".projectName");

const projectTime = document.querySelector(".projectTime");

const addProjBtn = document.querySelector(".btn_rec");

addProjBtn.addEventListener("click", () => {
  var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  let date = new Date().toLocaleDateString("ru", options)
  if (projectName.value.trim() != "" && projectTime.value.trim() != "") {
    if (projectTime.value.indexOf("h") === projectTime.value.indexOf("m")) {
      let data = {
        projectName: projectName.value.trim(),
        projectTime: projectTime.value.trim(),
        projectDate: date,
        projectRate: user.rate,
        projectProfit: (+projectTime.value.trim().split(":").join(".")*user.rate).toFixed(2),
        projectAuthor: user.id
      }
      setItem(data).then(res => location.href = "../html/main_pol.html");
    }
    else {
      alert("data entered incorrectly")
    }
  }
  else {
    alert("data entered incorrectly")
  }
})

