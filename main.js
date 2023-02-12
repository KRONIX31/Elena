const body = document.querySelector('body')
const videoBackground = document.querySelector('video')
const deployButton = document.querySelector('.deploy_button')
const headerSubMenu = document.querySelector('.header_submenu')
const progressbar = document.querySelector('.progressbar')
/*    */
const galleryImgs = document.querySelectorAll('.certificate_wrapper > img')
const galleryModals = document.querySelectorAll('.certificate_wrapper > .image_modal')
const galleryModalsImgs = document.querySelectorAll('.certificate_wrapper > .image_modal img')
const galleryModalsCloses = document.querySelectorAll('.certificate_wrapper > .image_modal .image_modal_close')
videoBackground.playbackRate = 0.85


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
    threshold: 0.7,
})

document.querySelectorAll('section').forEach((section)=>{
    observer.observe(section)
})

window.onscroll = function(){
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    progressbar.style.width = scrolled + "%";
}
deployButton.addEventListener('click', (e)=>{
    e.preventDefault()
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

/*   */

galleryModalsCloses.forEach((closeButton)=>{
    closeButton.addEventListener('click', ()=>{
        closeButton.parentElement.style.display = 'none'
        body.style.overflow = 'overlay'
    })
})
galleryImgs.forEach((image)=>{
    image.addEventListener('click', ()=>{
        body.style.overflow = 'hidden'
        const data = image.dataset.img
        galleryModals[data - 1].style.display = 'flex'
        galleryModalsImgs[data - 1].src = image.src
    })
})