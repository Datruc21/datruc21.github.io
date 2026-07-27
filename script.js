const main = document.querySelector("main")

const positions = {
    home:     { x: -100, y: 0 }, 
    resume:   { x: 0,    y: 0 },   
    about:    { x: -200, y: 0 },   // -200vw pour amener la colonne 3 au centre
    projects: { x: -100, y: -100 } // -100vw pour rester en colonne 2, -100vh pour monter la ligne 2
};

const goTo = (page) => {
    if (positions[page]) {
        const {x , y} = positions[page]
            main.style.transform = `translate(${x}vw, ${y}vh)`;
    } 
}


window.addEventListener('DOMContentLoaded', () => {
    goTo('home');});