function init() {
  let sounds = [];
  let playingSound = null;

  for (let i = 1; i <= 7; i++) {
    let audio = new Audio();
    audio.src = 'sounds/wow' + i + '.mp3';
    audio.preload = 'auto';
    let callback =  () => {
      console.log('loaded ' + audio.src);
      sounds.push(audio);
      audio.removeEventListener('canplaythrough', callback);
    };
    audio.addEventListener('canplaythrough', callback);
    audio.addEventListener('ended', () => playingSound = null);
  }

  let playSound = () => {
    if (null !== playingSound) {
      console.log('stopping ' + playingSound.src);
      playingSound.pause();
      playingSound.currentTime = 0;
      playingSound = null;
    }
    if (0 == sounds.length) {
      console.log('no loaded sounds to play yet!');
    } else {
      let index = Math.floor(Math.random() * sounds.length);
      playingSound = sounds[index];
      console.log('playing ' + playingSound.src);
      playingSound.play();
    }
  };

  let btn = document.getElementById('button');
  for (let event of ['mousedown', 'touchstart']) {
    btn.addEventListener(event, playSound);
  }
}
