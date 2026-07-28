const main = document.querySelector("main")

const positions = {
    home:     { x: -100, y: 0 }, 
    resume:   { x: 0,    y: 0 },   
    about:    { x: -200, y: 0 },   
    projects: { x: -100, y: -100 } 
};

let current_location = 'home'


const goTo = (page) => {
    if (positions[page]) {
        const {x , y} = positions[page]
            main.style.transform = `translate(${x}vw, ${y}vh)`;
            current_location = page
    } 
}


window.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
        case "ArrowUp": 
            if (current_location == 'projects') {
                goTo('home');
            }
            break;
        case "ArrowDown":
            if (current_location == 'home') {
                goTo('projects');
            }
            break;
        case "ArrowLeft":
            if (current_location == 'home') {
                goTo('resume');
            }
            else if (current_location == 'about') {
                goTo('home')
            }
            break;
        case "ArrowRight":
            if (current_location == 'home') {
                goTo('about');
            }
            else if (current_location == 'resume') {
                goTo('home')
            }
            break;

    }
})