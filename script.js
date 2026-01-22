window.addEventListener('load', () => {
    createPetals();
    // In case user doesn't see anything, try to auto-hide loading symptoms
    const main = document.querySelector('main');
    if (main) main.style.opacity = '1';
});

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 50;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = Math.random() * 15 + 10;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 5 + 7;

        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.5}px`;
        petal.style.left = `${left}%`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.animationDuration = `${duration}s`;

        const colors = ['#fffb00', '#ff9933', '#ffd54f', '#ffeb3b'];
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(petal);
    }
}

function changeImage(element, src) {
    const mainImg = document.getElementById('featured-image');
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => item.classList.remove('active'));
    element.parentElement.classList.add('active');

    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
    }, 400);
}

let player;
let isPlaying = false;
const playBtn = document.getElementById('play-btn');
const statusText = document.querySelector('.playing-status');
const wave = document.getElementById('wave-anim');

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: '6ccQbrZgk9s',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'playlist': '6ccQbrZgk9s',
            'mute': 0
        },
        events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Attempt autoplay, though browsers often block it
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        playBtn.textContent = '⏸';
        statusText.textContent = 'Playing Vandana...';
        if (wave) wave.style.display = 'block';
    } else {
        isPlaying = false;
        playBtn.textContent = '▶';
        statusText.textContent = 'Music Paused';
        if (wave) wave.style.display = 'none';
    }
}

playBtn.addEventListener('click', () => {
    if (player && player.playVideo) {
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }
});

// Added a global click listener to trigger music if autoplay was blocked
document.body.addEventListener('click', () => {
    if (player && player.getPlayerState() !== YT.PlayerState.PLAYING) {
        player.playVideo();
    }
}, { once: true });

function shareStatus() {
    if (navigator.share) {
        navigator.share({
            title: 'Happy Vasant Panchami',
            text: 'Maa Saraswati blessings! 🙏🌼',
            url: window.location.href
        });
    } else {
        alert('Link copied to clipboard for Status!');
    }
}
