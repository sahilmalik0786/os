var start_btn = document.querySelector(".start_btn");
var start_menu = document.getElementById("start_menu");
var clock = document.getElementById("clock");
var desktop = document.getElementById("desktop");
var windows_container = document.getElementById("windows-container");
var taskbar_items = document.getElementById("taskbar-items");
var sampleapp = document.getElementById("sampleapp");
var menu = document.getElementById("menu");
var settings_expand = document.querySelector(".settings-expand");
var day_container = document.querySelector(".days");
var menu_expand = document.querySelector(".menu-expand");
var items = document.getElementById("items");
var Mandyear = document.querySelector(".month");
var taskbar = document.getElementById("taskbar");
var context_menu = document.getElementById("context-menu");
var datescontainer = document.querySelector('.dates') 
import { apps, apps1 } from "./src/apps/apps.js";
import { calendar } from "./src/core/calendar.js";
import { createWindow } from "./src/core/window.js";
import { months, weeks } from "./src/datesAndMonths.js";
import { wallpaperArray } from "./src/wallpapersArray.js";

document.addEventListener("DOMContentLoaded", () => {
  // taskbar animation
  gsap.to(taskbar, {
    // left:"0px",
    bottom: 20,
    scale: 1,
    duration: 0.5,
    ease: "elastic.inOut(1,1)",
    // delay:0.2,
  });
    gsap.to('.quickset',{
            x:-30,
            stagger:0.01,
            scale:.5,
            ease:"elastic.in(1,0.6)",
            opacity:0
          })
              gsap.to(".ctx", {
          y: -10,
          opacity: 0,
          scale:.7,
          stagger: 0.1,
          ease: "elastic.out(1,1)",
        });
      
  let flag = false;
  
  //  funtion calls

  updateClock();
  setInterval(updateClock, 60000);
  insertAppsInMenu();
  insertItemsInTaskbar();
  changeBg();
  calendar(day_container, Mandyear , datescontainer);

  // function calls

  start_btn.addEventListener("click", (e) => {
    e.clientX;
    console.log(e.clientX);
    if (!flag) {
      flag = !flag;
      gsap.to(start_menu, {
        left: e.clientX,
        bottom: 100,
        duration: 0.5,
        ease: "bounce.out",
        opacity: 1,
      });
    } else {
      flag = !flag;
      gsap.to(start_menu, {
        // left: -700,
        bottom: -300,
        duration: 0.5,
        ease: "elastic.in(1,1)",
        opacity: 0,
      });
    }
  });

  function updateClock() {
    const now = new Date();
    let Month = months[now.getMonth()];
    let Day = weeks[now.getDay()];

    clock.textContent =
      now.toLocaleTimeString().slice(0, 5) +
      " " +
      Day +
      " " +
      now.getDate() +
      " " +
      Month;
  }
  // function createWindow(){}

  function insertAppsInMenu() {
    start_menu.innerHTML = "";
    apps.forEach((app) => {
      var div = document.createElement("div");
      div.className =
        "flex items-center px-4 py-2 hover:bg-pink-700  cursor-pointer";
      div.innerHTML = `
        <span class="mr-3" > <i class="${app.icon}"></i> </span>
        <span>${app.name}</span>
        `;

      div.addEventListener("click", () => {
        flag = !flag;

        createWindow(app.name, app.url, windows_container, app.icon);
        gsap.to(start_menu, {
          // left: -700,
          bottom: -300,
          duration: 0.5,
          ease: "elastic.in(1,1)",
          opacity: 0,
        });
      });

      start_menu.appendChild(div);
    });
    let expand_flag = false;
    let settings_flag = false;
    menu.addEventListener("click", (e) => {
      if (e.target.id == "clock") {
        console.log("hell");
        if (!expand_flag) {
          expand_flag = !expand_flag;
          gsap.to(menu_expand, {
            top: 100,
            left: 60,
            scale: 1.5,
            opacity: 1,
            duration: 0.5,
            ease: "elastic.out(1,1)",
          });
        } else {
          expand_flag = !expand_flag;
          gsap.to(menu_expand, {
            top: "-100%",
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: "elastic.in(1,1)",
          });
        }
      }
      if (e.target.className.includes("settings")) {
        // console.log('ehhhl')
        if (!settings_flag) {
          settings_flag = !settings_flag;
          gsap.to(settings_expand, {
            top: 100,
            duration: 0.4,
            opacity: 1,
            scale: 1.5,
            ease: "elastic.out(1,1)",
          });
          gsap.to('.quickset',{
            x:0,
            y:0,
            stagger:0.01,
            scale:1,
            ease:"elastic.out(1,0.3)",
            opacity:1
          })
        } else {
          settings_flag = !settings_flag;
          gsap.to(settings_expand, {
            top: "-224px",
            duration: 0.6,
            opacity: 0,
            scale: 0.5,
            ease: "elastic.in(1,1)",
          });
           gsap.to('.quickset',{
            x:-30,
            stagger:0.01,
            scale:.5,
            ease:"elastic.in(1,0.6)",
            opacity:0
          })
          //    gsap.to('.quickset',{
          //   x:30 ,
          //   stagger:0.1,
          // })
        }
      }
    });
  }

  function insertItemsInTaskbar() {
    items.innerHTML = "";
    let spanid = "span-" + Date.now();
    apps1.forEach((el) => {
      const span = document.createElement("span");
      span.className = "flex ml-2 hover:bg-pink-600 p-1 rounded";
      span.innerHTML = `<img src="${el.icon}" class="size-8  object-cover" />`;
      items.appendChild(span);

      span.addEventListener("click", () => {
        createWindow(el.name, el.url, windows_container);
      });
    });
  }
  //   document.body.addEventListener('',(e)=>{
  // console.log(e)
  //   })

 // disable original contextmenu...
  document.body.addEventListener(
    "contextmenu",
    function (ev) {
      ev.preventDefault();
      let even = 0;
      // console.log(ev)
      //  context_menu.style.top = ev.clientY - 20 + 'px'
      //  context_menu.style.left = ev.clientX + 20 +'px'

      return false;
    },
    false
  );

  // console.log(cdiv)

  let flagcon = false;
  document.body.addEventListener("mousedown", (e) => {
    if (e.button == 2) {
      console.log("ri");
      // context_menu.classList.toggle("hidden");
      if (!flagcon) {
        flagcon = !flagcon;

        gsap.to(context_menu, {
          left: e.clientX + 20 + "px",
          top: e.clientY - 20 + "px",
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1,1)",
        });
        // gsap.to(context_menu, {
        //   scale: 1,
        //   ease: "power3.out",
        // });
        gsap.to(".ctx", {
          y: 10,
          scale:1,
          duration:0.2,
          // stagger: 0.01,
          ease: "elastic.out(1,1)",
          opacity: 1,
        });
        // gsap.from(cdiv ,{
        //   x:30,
        //   stagger:0.1,
        //   // scale:.5,
        // })
      } else {
        flagcon = !flagcon;
        // console.log("he");
        gsap.to(context_menu, {
          scale: 0,
          duration: 0.5,
          ease: "elastic.in(1,1)",
          opacity:0
        });
        gsap.to(".ctx", {
          y: -10,
          opacity: 0,
          scale:.7,
          stagger: 0.1,
          ease: "elastic.out(1,1)",
        });
      }
    }
  });

  function changeBg() {
    var changebg = document.querySelector(".changebg");
    let num = -1;

    changebg.addEventListener("click", () => {
      console.log(num);
      // var num = Math.floor(Math.random()*4 + 1)
      if (num < 3) {
        num++;
      } else {
        num = 0;
      }
      console.log(num);
      var url = wallpaperArray[num].img;
      gsap.set(desktop, {
        backgroundImage: `url(${url})`,
        // backgroundSize:'+=100% +=100%',
        backgroundPosition: "bottom",
        duration: 0.3,
        ease: "elastic.out(1,1)",
      });

      // body.style.backgroundImage = `url(${url})`
      // desktop.style.backgroundImage = `url(${url})`
      // desktop.style.backgroundSize =
      console.log(wallpaperArray[num].img);
    });
  }

});
