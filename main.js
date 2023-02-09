const videoBackground = document.querySelector('video')
const deployButton = document.querySelector('.deploy_button')
const headerSubMenu = document.querySelector('.header_submenu')
videoBackground.playbackRate = 0.71

if (sessionStorage.getItem("is_reloaded")) {
	console.log('Страница перезагружена')
    window.location.hash = ''
}
sessionStorage.setItem("is_reloaded", true)

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            document.querySelectorAll('.header_left_block a').forEach((link)=>{
                if(link.getAttribute('href').replace('#', '') === entry.target.id){
                    link.classList.add('nav_active_hash')
                } else{
                    link.classList.remove('nav_active_hash')
                }
            })
        }
    })
}, {
    threshold: 0.5,
})

document.querySelectorAll('section').forEach((section)=>{
    observer.observe(section)
})

deployButton.addEventListener('click', ()=>{
    if(deployButton.classList.contains('nav_active_hash')){
        deployButton.classList.remove('nav_active_hash')
        headerSubMenu.classList.remove('header_submenu_active')
        setTimeout(()=>{
            headerSubMenu.style.display = 'none'
        }, 250)
    } else{
        deployButton.classList.add('nav_active_hash')
        headerSubMenu.style.display = 'block'
        setTimeout(()=>{
            headerSubMenu.classList.add('header_submenu_active')
        }, 50)
    }
})
window.onclick = function(e) {
    if (!e.target.matches('.deploy_button')) {
        if (headerSubMenu.classList.contains('header_submenu_active')){
            console.log('remove')
            headerSubMenu.classList.remove('header_submenu_active')
            deployButton.classList.remove('nav_active_hash')
        }
    }
}