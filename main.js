const videoBackground = document.querySelector('video')
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