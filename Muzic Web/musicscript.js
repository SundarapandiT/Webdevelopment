document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseButton = document.querySelector('.play-pause-btn');
    const volumeSlider = document.querySelector('.volume-slider');
    const timeDisplay = document.querySelector('.time');
    const songDetails = document.querySelector('.song-details p');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    let isPlaying = false;
    let currentSongIndex = 0;

    const songs = [
        { name: 'Rangu-Rangamma', artist: 'Harris Jeyaraj' },
        { name: 'Azhagiye', artist: 'A.R.Rahman' },
        // Add more songs as needed
    ];

    playPauseButton.addEventListener('click', function () {
        togglePlayPause();
    });

    prevButton.addEventListener('click', function () {
        playPreviousSong();
    });

    nextButton.addEventListener('click', function () {
        playNextSong();
    });

    audioPlayer.addEventListener('timeupdate', function () {
        updatePlaybackInfo();
    });

    audioPlayer.addEventListener('ended', function () {
        playNextSong();
    });

    volumeSlider.addEventListener('input', function () {
        adjustVolume();
    });

    function togglePlayPause() {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
        isPlaying = !isPlaying;
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playCurrentSong();
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playCurrentSong();
    }

    function playCurrentSong() {
        const currentSong = songs[currentSongIndex];
        audioPlayer.src = `${currentSong.name}.mp3`; // Update with your file path
        audioPlayer.play();
        isPlaying = true;
        updatePlaybackInfo();
    }

    function updatePlaybackInfo() {
        const currentTime = formatTime(audioPlayer.currentTime);
        const duration = formatTime(audioPlayer.duration);
        const currentSong = songs[currentSongIndex];
        songDetails.innerHTML = `Now Playing: <strong>${currentSong.name}</strong> - ${currentSong.artist}`;
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    }

    function adjustVolume() {
        audioPlayer.volume = volumeSlider.value / 100;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${padZero(minutes)}:${padZero(remainingSeconds)}`;
        return formattedTime;
    }

    function padZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    // Initial song details
    playCurrentSong();
});
