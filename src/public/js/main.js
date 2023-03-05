
const main = () => {
  const socket = io();

  window.socket = socket
  const answerSynth = new Tone.FMSynth().toDestination();
  const querySynth =  new Tone.AMSynth().toDestination();

  socket.on('query', message => {
    console.log('query')
    console.log(message)
    querySynth.triggerAttackRelease("C4", "4n");
    
  })
  
  socket.on('answer', message => {
    console.log('answer')
    console.log(message)
    answerSynth.triggerAttackRelease("E4", "4n");
  })
}

const initButton = document.querySelector('#init')
initButton.onclick = main
