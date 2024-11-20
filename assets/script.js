let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index]
    item.style.setProperty('--zIndex', zIndex)
    item.style.setProperty('--active', (index - active) / $items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
    progress = Math.max(0, Math.min(progress, 100))
    active = Math.floor(progress / 100 * ($items.length - 1))

    $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
    item.addEventListener('click', () => {
        progress = (i / $items.length) * 100 + 10
        animate()
    })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
    const wheelProgress = e.deltaY * speedWheel
    progress = progress + wheelProgress
    animate()
}

const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        })
    }
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    progress = progress + mouseProgress
    startX = x
    animate()
}

const handleMouseDown = e => {
    isDown = true
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
    isDown = false
}


function togglePlay() {
    const video = document.getElementById('videoPlayer');
    const playButton = document.getElementById('playButton');

    if (video.style.display === 'none') {
        video.style.display = 'block'; // Show video
        playButton.style.display = 'none'; // Hide button
        video.src += "?autoplay=1"; // Autoplay video
    }
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)


// Get all audio elements with the class 'audio'
const audioElements = document.getElementsByClassName('audio');

// Add a click event listener to the window
window.addEventListener('click', function () {
    // Play the audio if it exists
    if (audioElements.length > 0) {
        audioElements[0].play(); // Play the first audio element
    }
});

//custom 
// function animate1() {
//     const carouselItems = document.getElementsByClassName('carousel-item');

//     if (carouselItems.length === 0) {
//         console.error("No elements with the class 'carousel-item' found.");
//         return;
//     }

//     for (let i = 0; i < carouselItems.length; i++) {
//         carouselItems[i].style.transition = 'transform 1s cubic-bezier(0, 0.02, 0, 1)';
//     }
//     console.log("hello")
// }
// animate1();


function removeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('startButton').addEventListener('click', () => {
    const duration = 2000; // 2 seconds
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    (function frame() {
        confetti({
            particleCount: 2,
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            origin: { x: Math.random(), y: Math.random() - 0.2 },
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    })();
});
