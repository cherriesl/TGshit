var audio = {
  ready: false,
  context : null,
  analyser : null,
  fftSize: 256,
  bands: 5,
  step: null,
  element : null,
  bufferLength : null,
  data: null,
  track : null,
  start: function() {
    this.element = document.getElementById('audio')
    this.context = new AudioContext()
    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = this.fftSize*2 
    this.track = this.context.createMediaElementSource(this.element)
    this.bufferLength =  this.analyser.frequencyBinCount
    this.step = parseInt(this.bufferLength/this.bands)
    this.data = new Uint8Array(this.bufferLength)
    this.track.connect(this.analyser)
    this.track.connect(this.context.destination)
    this.element.play()
    this.ready = true
  },
  updateData: function(){
    this.analyser.getByteFrequencyData(this.data)
  },
  getBand: function(number){
    var result = 0
    var i = (number-1)*this.step
    for(i; i< this.step*number; i++)
      result+= this.data[i]
    return result/(this.fftSize*this.step)
  }
}

var game = {
  images: null,
  body: null,
  logo: null,
  start: function(){
    this.body = document.body
    this.logo = document.getElementById('logo')
    this.updateBackground()
  },
  updateBackground: function(p1, p2, p3) {
    this.body.style.background = `radial-gradient(circle, 
      rgba(255,255,255,0) ${p3}%,
      rgba(255,0,0,1) ${p2}%,
      rgba(255,255,255,0) ${p1}%)`
  }
}

window.addEventListener('click', function() {
  if(!audio.ready) audio.start()
});

window.onload = ()=>{
  game.start()
  window.requestAnimationFrame(draw)
}

function draw(timestamp){
  if(audio.ready){
    audio.updateData()
    let p1 = audio.getBand(1)
    let p2 = audio.getBand(2)
    let p3 = audio.getBand(4)
    p1 = 100*p1*p1*p1
    p2 = 100*p2*p2
    p3 = 100*p3
    game.updateBackground(p1, p2, p3)
  }
  window.requestAnimationFrame(draw)
}
