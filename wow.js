function init() {
  let sounds = [];
  let prevIndex = -1;

  for (let i = 1; i <= 7; i++) {
    let audio = new Audio();
    let src = 'sounds/wow' + i + '.mp3';
    audio.src = src;
    audio.preload = 'auto';
    let loadedCallback =  () => {
      console.log('loaded ' + audio.src);
      sounds.push(audio);
      audio.removeEventListener('canplaythrough', loadedCallback);
    };
    audio.addEventListener('canplaythrough', loadedCallback);
    audio.stop = () => {
      audio.src = (
        'data:audio/wav;base64,' +
        'UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA='
      );
    };
    audio.start = () => {
      audio.src = src;
      audio.play();
    }
    document.body.appendChild(audio);
  }

  let playSound = () => {
    // Stop any currently playing sounds
    for (let sound of sounds) {
      sound.stop();
    }
    // Pick and play a random sound if one has loaded
    if (0 == sounds.length) {
      console.log('no loaded sounds to play yet!');
    } else {
      // Select a sound that is not the most recently played sound
      let index;
      do {
        index = Math.floor(Math.random() * sounds.length);
      } while (index === prevIndex);
      prevIndex = index;
      let sound = sounds[index];
      console.log('playing ' + sound.src);
      sound.start();
    }
  };

  let btn = document.getElementById('button');
  for (let event of ['click', 'touchend']) {
    btn.addEventListener(event, playSound);
  }
}
