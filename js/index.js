import { getCurrentTime, getCurrentDay } from "./dateTime.js";
import { fetchWeather } from "./weather";
const timeElement = document.getElementById("time");
const weekDaysHolder = document.getElementById("weekDays");
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//const h = document.getElementById("hour");
//const m = document.getElementById("min");
//const s = document.getElementById("sec");
const ap = document.getElementById("ap");

function getTime() {
  setActiveDay(getCurrentDay());
  let currentTime = getCurrentTime();
  let timeArr = currentTime.split(",");
  currentTime = timeArr[0];
  let amPm = timeArr[1];

  timeElement.innerText = currentTime;
  /*
  h.innerText = hour;
  m.innerText = mins;
  s.innerText = sec;
  */
  ap.innerText = amPm;

  //console.log("Time : "+weekDays[day])

  setTimeout(getTime, 1000);
}

function setActiveDay(dayArr) {
  let day = dayArr[1];
  weekDaysHolder.innerHTML = "";

  for (let index in weekDays) {
    let daySpan = document.createElement("span");
    daySpan.innerText = weekDays[index] + " ";
    daySpan.className = "";

    if (day == index) {
      daySpan.className = "active";
    } else {
      daySpan.className = "in-active";
    }
    weekDaysHolder.appendChild(daySpan);
  }
}

getTime();
// console.log("main call : "+getTime())
// console.log("main call  get day: "+setActiveDay(0))

const themeSwitch = document.getElementById("theme-switch");
const outerDiv = document.getElementById("clockBG");
const innerDiv = document.getElementById("display");

localStorage.setItem("themeMode", "light");

themeSwitch.addEventListener("click", (e) => {
  let theme = localStorage.getItem("themeMode");

  if (theme == "light" || theme == "") {
    outerDiv.classList.add("dark-clock");
    timeElement.classList.add("dark-text");
    innerDiv.classList.add("dark-display");
    weekDaysHolder.classList.add("dark-text");
    ap.classList.add("dark-text");

    localStorage.setItem("themeMode", "dark");
  } else {
    outerDiv.classList.remove("dark-clock");
    timeElement.classList.remove("dark-text");
    innerDiv.classList.remove("dark-display");
    weekDaysHolder.classList.remove("dark-text");
    ap.classList.remove("dark-text");

    document.documentElement.removeAttribute("data-themeMode");
    localStorage.setItem("themeMode", "light");
  }
});

//module.exports = { getTime, setActiveDay };

fetchWeather();
