export const addToTaskbar = (name , icon ,container)=>{
   const span = document.createElement('span')
   let spanid = "span-" + Date.now()

   span.innerHTML = `<i class="${icon} size-14 hover:bg-pink-600 p-2 rounded-md"> <i/>`
   span.id = spanid

   container.appendChild(span)
   
}