import { addToTaskbar } from "./addToTaskbar.js";
import { makeDrag } from "./makeDrag.js";

let zindex = 1;
const taskbar_items = document.getElementById('taskbar-items')

export const createWindow = (title, contentUrl, container ,icon) => {
  const windowid = "window-" + Date.now();
  const headerid = 'header-' + Date.now();
  let topos = Math.floor(Math.random() * 100 + 1);
  let leftpos = Math.floor(Math.random() * 300 + 1);
  console.log(topos);

  fetch(contentUrl)
    .then((res) => res.text())
    .then((html) => {
      const windowe1 = document.createElement("div");
      windowe1.className = "window select-none shadow-xl";
      windowe1.style.zIndex = zindex;
      windowe1.style.top = topos + "px";
      windowe1.style.left = leftpos + "px";
      windowe1.id = windowid;
      windowe1.innerHTML = `<div class="window-header flex " id="${headerid}">
                    
                    <span class = "flex items-center justify-center w-fit gap-1">   <button class="close-btn size-3 hover:bg-red-700 rounded-full flex items-center justify-center bg-red-600 "></button>
                     <button class="max-btn size-3 hover:bg-yellow-800 rounded-full flex items-center justify-center bg-yellow-400 "> </button>
                    <button class="min-btn size-3 hover:bg-green-800 rounded-full flex items-center justify-center bg-green-400 shadow"></button>
</span>
                </div>
                <div class="window-content">${html}</div>`;
      // console.log(html)
      container.appendChild(windowe1);
      addToTaskbar(title , icon , taskbar_items)
      makeDrag( windowe1 , headerid);
      
      let maxFlag = false;
      windowe1.addEventListener("click", (e) => {
        console.log(e.target.id);
        if (e.target.className.includes("close-btn")) {
          const node = document.getElementById(windowid);
          windowe1.parentNode.removeChild(node);
        }
        if (e.target.className.includes("max-btn")) {
          // console.log(maxFlag)
          if (maxFlag==false) {
            maxFlag = !maxFlag;
            console.log(maxFlag)
            windowe1.style.width = "100dvw";
            windowe1.style.height = "100dvh";
            windowe1.style.top = "-5%"
            windowe1.style.left = 0;
            windowe1.style.right = 0
            windowe1.style.borderRadius = 0;
            windowe1.style.zIndex = '20'

          } else if(maxFlag == true) {
            maxFlag = !maxFlag;
            windowe1.style.width = "500px";
            windowe1.style.height = "400px";
            windowe1.style.borderRadius= '10px'
            windowe1.style.zIndex = '1'
            console.log(maxFlag)
          }
        }
      });
      // const close = document.querySelector('.close-btn')
      // close.addEventListener('click' , (e)=>{
      //   console.log(e)
      //   container.removeChild(windowid)

      // } )
    });
};
