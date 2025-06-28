export const makeDrag = (elem , id) => {
    let offsetX, offsetY;
    let zindex = 1
    var window_header = document.getElementById(id)
    console.log(window_header)
    window_header.addEventListener("mousedown", drag);
    let isDragging = false;
    // console.log(zindex)

    
    function drag(e) {
        // console.log(e);
        isDragging = true;
        
        offsetX = e.clientX - elem.getBoundingClientRect().left;
        offsetY = e.clientY - elem.getBoundingClientRect().top;
        console.log("dragiing");
        window_header.style.cursor = "grabbing";
        // elem.style.zIndex = zindex++
        // setInterval(()=>{elem.style.zIndex = 1},2000)
    console.log(elem.style.zIndex)
  }

  document.addEventListener("mousemove", mousemove);
  function mousemove(el) {
    if (!isDragging) return;

    
    // elem.style.left = el.clientX - offsetX + "px"
    // elem.style.top = el.clientY - offsetY + "px"
   gsap.to(elem , {
    left: el.clientX - offsetX,
    top: el.clientY - offsetY,
    duration : 0.1,
    ease:'powerInOut'

    
   })
    
  }
  document.addEventListener('mouseup' , mouseup)
  function mouseup(){
     isDragging = false
    window_header.style.cursor = "move";
    // elem.style.zIndex = 1
    console.log(elem.style.zIndex)
  }
};
