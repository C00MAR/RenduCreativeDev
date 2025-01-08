class MusicPlayer {
  private music: HTMLAudioElement;
  private playBtn: HTMLElement;
  private pauseBtn: HTMLElement;
  private seekbar: HTMLInputElement;
  private currentTime: HTMLElement;
  private duration: HTMLElement;
  
  constructor() {
    // Use type assertion (!) to tell TypeScript these elements will exist
    this.music = document.querySelector('.music-element') as HTMLAudioElement;
    this.playBtn = document.querySelector('.play') as HTMLElement;
    this.seekbar = document.querySelector('.seekbar') as HTMLInputElement;
    this.currentTime = document.querySelector('.current-time') as HTMLElement;
    this.duration = document.querySelector('.duration') as HTMLElement;
    this.pauseBtn = document.querySelector('.pause') as HTMLElement;
    // Bind event listeners
    this.initializeEventListeners();
  }
  
  private initializeEventListeners(): void {
    // Bind the methods to maintain correct 'this' context
    this.music.addEventListener('loadeddata', this.handleLoadedData.bind(this));
    this.music.addEventListener('timeupdate', this.handleTimeUpdate.bind(this));
    this.music.addEventListener('ended', this.handleEnded.bind(this));
    this.seekbar.addEventListener('input', this.handleSeekBar.bind(this));
  }
  
  public handlePlay(): void {
    if (this.music.paused) {
      this.music.play();
      this.playBtn.classList.add('hide');
      this.pauseBtn.classList.remove('hide');
    } else {
      this.music.pause();
      this.playBtn.classList.remove('hide');
      this.pauseBtn.classList.add('hide');
    }
  }
  
  private handleEnded(): void {
    this.playBtn.classList.remove('hide');
    this.pauseBtn.classList.add('hide');
    this.music.currentTime = 0;
  }
  
  private handleLoadedData(): void {
    this.seekbar.max = this.music.duration.toString();
    const ds: number = Math.floor(this.music.duration % 60);
    const dm: number = Math.floor((this.music.duration / 60) % 60);
    this.duration.innerHTML = `${dm}:${ds.toString().padStart(2, '0')}`;
  }
  
  private handleTimeUpdate(): void {
    this.seekbar.value = this.music.currentTime.toString();
    const cs: number = Math.floor(this.music.currentTime % 60);
    const cm: number = Math.floor((this.music.currentTime / 60) % 60);
    this.currentTime.innerHTML = `${cm}:${cs.toString().padStart(2, '0')}`;
  }
  
  private handleSeekBar(): void {
    this.music.currentTime = Number(this.seekbar.value);
  }
}

// Initialize the player when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const player = new MusicPlayer();
  
  // Add click event listener to play button if needed
  const playBtn = document.querySelector('.play');
  const pauseBtn = document.querySelector('.pause');
  if (playBtn) {
    playBtn.addEventListener('click', () => player.handlePlay());
  }
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => player.handlePlay());
  }
});