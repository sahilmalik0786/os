// On page load or when changing 
// themes, best to add inline in `head` to avoid FOUC
var theme = document.querySelector('.theme')
theme.addEventListener('click' , ()=>{
    console.log('cc')
document.documentElement.classList.toggle(
  'dark'
  
)
})


// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme')