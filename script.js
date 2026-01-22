window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 800);

    createPetals();
});

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 40;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = Math.random() * 12 + 8;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = Math.random() * 4 + 6;

        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.4}px`;
        petal.style.left = `${left}%`;
        petal.style.animationDelay = `${delay}s`;
        petal.style.animationDuration = `${duration}s`;

        const colors = ['#fffb00', '#ffeb3b', '#ffc107', '#ff9933'];
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];
        petal.style.opacity = Math.random() * 0.4 + 0.3;

        container.appendChild(petal);
    }
}

function changeImage(element, src) {
    const mainImg = document.getElementById('featured-image');
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => item.classList.remove('active'));
    element.parentElement.classList.add('active');

    mainImg.style.transform = 'scale(0.95)';
    mainImg.style.opacity = '0';

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
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Try to play immediately, might be blocked by browser
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        isPlaying = true;
        playBtn.textContent = '⏸';
        statusText.textContent = 'Vandana Playing...';
        wave.style.display = 'block';
    } else {
        isPlaying = false;
        playBtn.textContent = '▶';
        statusText.textContent = 'Music Paused';
        wave.style.display = 'none';
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

function shareStatus() {
    if (navigator.share) {
        navigator.share({
            title: 'Happy Vasant Panchami',
            text: 'Maa Saraswati ki kripa aap par bani rahe! 🙏🌼 Check this divine celebration:',
            url: window.location.href
        });
    } else {
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Website Link Copied! Ab aap ise WhatsApp Status par laga sakte hain.');
    }
}
