import { months, weeks } from "../datesAndMonths.js"

export const calendar = (dcont , mcont , dtcont)=>{
    dcont.innerHtml = ''
    dtcont.innerHTML = ''

    
    const calendar = new Date()
    const day = calendar.getDay()
    let year = calendar.getFullYear()
    let month = calendar.getMonth()
    let date = calendar.getDate()

    const start = new Date(year , month , 1).getDay()
    const endDate = new Date(year , month +1 , 0 ).getDate()
    const end = new Date(year , month , endDate).getDay()
    const endDatePrev = new Date(year , month , 0).getDate()

    
    dtcont.className = 'gap-2 grid grid-cols-7  '
    console.log(start , end , endDate ,endDatePrev)

    weeks.forEach((e)=>{
        
        const li = document.createElement('li')
        
        li.innerHTML = e
        li.className = `bg-black px-1 rounded ${weeks[day]==e ? 'bg-red-500' : ''}`
        dcont.appendChild(li)
    })
    for(let i = start; i > 0; i--){
        datehtml += `<li class="text-white text-xs  "> ${endDatePrev - i + 1 } </li>`
        console.log(i)
    }
    for(let i = 1 ; i<=endDate ; i++){
        
        const li = document.createElement('li')
        li.innerHTML = i
        li.className =`text-white  text-[11px] flex justify-center hover:bg-white transition-all p-1 rounded-md hover:text-black hover:font-black font-thin ${date == i ?'bg-red-500 font-bold': ''}`
        // datehtml += li
        dtcont.appendChild(li)
    }
   
    mcont.textContent = months[month] +" "+ year

    
}