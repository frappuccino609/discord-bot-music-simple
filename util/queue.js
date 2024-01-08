module.exports = class Queue {
  constructor() {
    this.songs = [];
    this.volume = 5;
    this.playing = false;
  }

  add(song) {
    this.songs.push(song);
  }

  skip() {
    this.songs.shift();
  }

  clear() {
    this.songs = [];
  }

  get currentSong() {
    return this.songs[0];
  }
};