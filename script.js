const main = document.querySelector("main");

const positions = {
    home:     { x: -100, y: 0 }, 
    resume:   { x: 0,    y: 0 },   
    about:    { x: -200, y: 0 },   
    projects: { x: -100, y: -100 } 
};

let current_location = 'home';

const goTo = (page) => {
    if (positions[page]) {
        const { x, y } = positions[page];
        main.style.transform = `translate(${x}vw, ${y}vh)`;
        current_location = page;

        // Mise à jour visuelle du point rouge sur la minimap
        document.querySelectorAll('.map-cell').forEach(cell => cell.classList.remove('active'));
        
        const currentCell = document.getElementById(`map-${page}`);
        if (currentCell) {
            currentCell.classList.add('active');
        }
    } 
};

// Navigation aux flèches du clavier
window.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
        case "ArrowUp": 
            if (current_location === 'projects') goTo('home');
            break;
        case "ArrowDown":
            if (current_location === 'home') goTo('projects');
            break;
        case "ArrowLeft":
            if (current_location === 'home') goTo('resume');
            else if (current_location === 'about') goTo('home');
            break;
        case "ArrowRight":
            if (current_location === 'home') goTo('about');
            else if (current_location === 'resume') goTo('home');
            break;
    }
});

// Bloquer les flèches sur le select de la langue
const languageSelect = document.querySelector('header select');
if (languageSelect) {
    languageSelect.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });
}

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

window.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);


function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const swipeThreshold = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < -swipeThreshold) {
            if (current_location === 'home') goTo('about');
            else if (current_location === 'resume') goTo('home');
        }
        else if (deltaX > swipeThreshold) {
            if (current_location === 'home') goTo('resume');
            else if (current_location === 'about') goTo('home');
        }
    }
    else {
        if (deltaY < -swipeThreshold) {
            if (current_location === 'home') goTo('projects');
        }
        else if (deltaY > swipeThreshold) {
            if (current_location === 'projects') goTo('home');
        }
    }
}