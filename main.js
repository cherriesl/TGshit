var languague = "es"
const audio = {
    bgm: new Audio('audio/bgm.mp3'),
    click: new Audio('audio/click.mp3'),
    ending: new Audio('audio/ending.mp3'),
    typings: [
        new Audio('audio/t1.mp3'),
        new Audio('audio/t2.mp3'),
        new Audio('audio/t3.mp3'),
        new Audio('audio/t4.mp3'),
        new Audio('audio/t5.mp3'),
    ]
}
audio.bgm.loop = true
const speedType = 50
const endings = [
    {
        title: 'BAD ENDING',
        image: 'img/end1.png',
        text: 'No lograste escapar de Latinoaméica y todos tus panas fueron víctimas de la ola de crímenes de tu país tercermundista.'
    },
    {
        title: 'NEUTRAL ENDING',
        image: 'img/end2.png',
        text: 'Decidiste quedarte en latinoamérica como político corrupto. Tú y tus panas están en la gloria, pero... ¿A qué costo?'
    },
    {
        title: 'FAKE REALITY ENDING',
        image: 'img/end3.png',
        text: 'No hay necesidad de escapar de Latinoamérica. Todo a mejorado. No más delicuencia. No más corrupción. Latinoamérica es todoo lo que debió haber sido.'
    },
    {
        title: 'MISSING DEADLINE',
        image: 'img/end4.png',
        text: 'Vivir en Latinoamérica es agobiante, pero también lo es la idea de escapar de él. Decidiste no hacer nada. No pensar en nada. Ser  una nada. Nada.'
    },
    {
        title: 'ROYAL ENDING',
        image: 'img/end5.png',
        text: 'Mientras tus panas servían como distracción, lograste escapar de Latinoamérica, pero Latinoamérica no ha escapado de ti.'
    },
    {
        title: 'REALLITY ENDING',
        image: 'img/end6.png',
        text: 'No debiste salir de Latinoamérica sin saber inglés.'
    },
]

function typeText(element, txt){
    let i = 0
    typeWriter()
    function typeWriter(){
        if (element && i < txt.length) {
             element.innerHTML += txt.charAt(i)
             i++
             audio.typings[Math.round(Math.random()*4)].cloneNode(true).play()
             setTimeout(typeWriter, speedType)
           }
    }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function loadEnding(){
    let img = document.querySelector('.endingImg')
    let title = document.querySelector('.endingTitle')
    let text = document.querySelector('.endingText')
    text = document.createElement('div')
    insertAfter(title, text)
    text.classList.add('endingText')
    ending = endings[parseInt(Math.random()*(endings.length-1))]
    img.style.background = `url('${ending.image}')`
    img.style.backgroundSize = 'cover'
    img.style.backgroundRepeat = 'no-repeat'
    img.style.backgroundPosition = 'center'
    title.innerHTML = ending.title
    typeText(text, ending.text)
}

document.addEventListener('DOMContentLoaded', ()=>{
    audio.bgm.volume = 0.3
    const sGame = new Splide('#game',{
        type: 'fade',
        arrows: false,
        pagination: false,
        drag: false
    }).mount()

    new Splide('#background-main',{
        type: 'fade',
        rewind: true,
        speed: 1500,
        cover: true,
        heightRatio: 1,
        arrows: false,
        pagination: false,
        drag: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplay: true,
        interval: 3000,
        width : '100vw',
		height: '100vh'
    }).mount()

    document.querySelector('.load-game').addEventListener('click', ()=>{
        sGame.go(1)
        audio.bgm.play()
    })

    document.querySelector('.start-game').addEventListener('click', ()=>{
        sGame.go(2)
        let message = document.createElement('div')
        message.classList.add('message')
        let textBox = document.querySelector('.textBox')
        textBox.insertBefore(message, textBox.firstChild)
        typeText(message, `Hoshino: ¿Te gusta vivir en latinoamerica?`)

        let hoshino = document.querySelector('.hoshino')
        hoshino.classList.add('show')
    })

    document.querySelectorAll('.options button').forEach(button =>{
        button.addEventListener('click', ()=>{
            document.querySelector('.message')?.remove()
            let hoshino = document.querySelector('.hoshino')
            hoshino.classList.remove('show')
            sGame.go(3)
            audio.ending.play()
            loadEnding()
        })
    })

    document.querySelector('.play-again').addEventListener('click', ()=>{
        document.querySelector('.endingText')?.remove()
        audio.ending.pause()
        audio.ending.currentTime = 0
        sGame.go(1)
    })
    document.querySelectorAll('.click').forEach(button =>{
        button.addEventListener('click', () => audio.click.cloneNode(true).play())
    })
})
