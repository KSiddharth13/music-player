const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

// Music
const songs = [
    {
        name: 'Dosti',
        displayName: 'Dosti',
        artist: 'M M Keeravani',
    },
    {
        name: 'Etthara Jenda',
        displayName: 'Etthara Jenda',
        artist: 'M M Keeravani',
    },
    {
        name: 'Janani',
        displayName: 'Janani',
        artist: 'M M Keeravani',
    },
    {
        name: 'Naatu Naatu',
        displayName: 'Naatu Naatu',
        artist: 'M M Keeravani',
    },
    {
        name: 'Raamam Raaghavam',
        displayName: 'Raamam Raaghavam',
        artist: 'M M Keeravani',
    },
    {
        name: 'RRR',
        displayName: 'Roar of RRR',
        artist: 'M M Keeravani',
    },
];


// Backward song
function prevSong(){
    if(songIndex === 0){
        songIndex = songs.length-1;
    } else{
        songIndex -= 1;
    }
    loadSong(songs[songIndex])
    playSong();
}

// Forward song
function nextSong(){
    if(songIndex === songs.length-1){
        songIndex = 0;
    } else{
        songIndex += 1;
    }
    loadSong(songs[songIndex])
    playSong();
}

// Check if playing
let isPlaying = false

// Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play()
}

// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause()
}

// Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}


// Current song
let songIndex = 0

// On Load -select first song
loadSong(songs[songIndex]);

// Update Progress Bar
function updateProgressBar(event) {
    if(isPlaying) {
        // Using object destruction
        const {duration , currentTime} = event.srcElement;
        // Update Progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds<10){
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }


        // Calculate display for currentTime
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds<10){
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        // Delay switching currentTime Element to avoid NaN
        if(currentTimeSeconds){
        currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
        }
    }
}

function setProgressBar(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
    progress.style.width = `${(clickX / width)*100}%`;
}


// Event listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);