const button = document.getElementById("duckBtn");
const container = document.getElementById("duckContainer");
const quackSound = document.getElementById("quack");

let duckCount = 0;
let evilModeStarted = false;
let autoClicker = null;

function playQuack() {
    if (quackSound) {
        quackSound.currentTime = 0;
        quackSound.play().catch(err => console.log("Click anywhere to allow the audio to play"))
    }
}

function playExplosionSound() {
    const explosionAudio = new Audio("https://cdn.freesound.org/previews/105/105413_1800060-lq.mp3");
    explosionAudio.volume = 0.7;
    explosionAudio.play().catch(err => console.log("Click anywhere to allow the audio to play"));
}

function makeDucksBowDown () {
    const allDucks = document.querySelectorAll(".duck");
    allDucks.forEach(duck => {
        duck.style.animation = "none";
        duck.style.setProperty('--rot', '0deg');
        duck.style.transform = "rotate(0deg)";
    });
}

function triggerExplosion() {
    const boom = document.createElement("div");
    boom.className = "explosion-text";
    boom.innerText = "BOOM";
    document.body.appendChild(boom);
    setTimeout(() => {boom.remove();}, 800);
}

button.addEventListener("click", () => {
    duckCount++;
    playQuack();

    const duck = document.createElement("div");
    duck.classList.add("duck");
    duck.innerText = "🦆";

    duck.style.fontSize = Math.random() * 100 + 20 + "px";

    const randomRotation = Math.random() * 360;
    duck.style.setProperty('--rot', `${randomRotation}deg`)

    let randomX = Math.random() * (window.innerWidth - 120);
    let randomY = Math.random() * (window.innerHeight - 120);

    if (randomX < 200 && randomY < 120) {
        randomX += 200;
        randomY += 120;
    }

    duck.style.left = randomX + "px";
    duck.style.top = randomY + "px";

    container.appendChild(duck);

    if (duckCount >= 20 && duckCount < 50) {
        document.body.style.background = "lightyellow";
        document.querySelector("p").innerText = "The sky's turning yellow... Things are getting strange..."
    }

    if (duckCount >= 50 && duckCount < 100) {
        document.body.style.background = "orange";
        document.querySelector("p").innerText = "THE DUCKS ARE GETTING UNSETTLED. STOP CLICKING..."
        button.innerText = "DON'T CLICK ME";
    }

    if(duckCount === 100) {
        document.body.style.background = "#8b0000";
        const pTag = document.querySelector("p");
        pTag.innerText = "YOU WERE WARNED. THE HOARD HAS AWAKENED.";
        pTag.style.color = "white";
        button.innerText = "TOO LATE.";

        const bossDuck = document.createElement("img");
        bossDuck.classList.add("duck");
        bossDuck.classList.add("shake");
        bossDuck.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KjBG9MaciGWtAtb1uBY3EJzySkxMuWAOMQ&s";
        bossDuck.alt = "angry boss duck.";

        bossDuck.style.width = "400px";
        bossDuck.style.height = "auto";
        
        bossDuck.style.left = "50%";
        bossDuck.style.top = "50%";
        bossDuck.style.transform = "translate(-50%, -50%)";

        bossDuck.style.setProperty('--rot', '0deg');
        container.appendChild(bossDuck);

    }

    if (duckCount === 175 && !evilModeStarted) {
        evilModeStarted = true;
        alert("THE DUCKS HAVE TAKEN CONTROL.")

        autoClicker = setInterval (() => {
            button.click();
        }, 150);
    }

    if (duckCount === 215) {

        if (autoClicker) {
            clearInterval(autoClicker);
        }

        triggerExplosion();

        document.querySelector("p").innerText = "";

        const oldBoss = container.querySelector('img[alt = "angry boss duck."]');
        if (oldBoss) {
            oldBoss.remove();
        }

        setTimeout(() => {
        alert("IT'S OVER. THE DUCKS RULE THE PLANET NOW.")
        button.innerText = "THE END.";
        document.body.style.background = "#DAA520";
        button.style.pointerEvents = "none";
        }, 300);

        makeDucksBowDown();

        const emperorDuck = document.createElement("img");
        emperorDuck.classList.add("duck");
        emperorDuck.classList.add("shake");
        emperorDuck.src = "https://p.kindpng.com/picc/s/97-974624_rubber-duck-crown-png-transparent-png.png";
        emperorDuck.alt = "the emperor duck.";


        emperorDuck.style.width = "400px";
        emperorDuck.style.height = "auto";
        emperorDuck.style.left = "50%";
        emperorDuck.style.top = "50%";
        emperorDuck.style.transform = "translate(-50%, -50%)";

        emperorDuck.style.setProperty('--rot', '0deg');
        container.appendChild(emperorDuck);
    }
});

button.addEventListener("mouseover", () => {
    if (duckCount >= 50) {
        const newX = Math.random() * (window.innerWidth - button.offsetWidth);
        const newY = Math.random() * (window.innerHeight - button.offsetHeight);

        button.style.left = newX + "px";
        button.style.top = newY + "px";
    }
});
