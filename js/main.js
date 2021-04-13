localStorage.setItem("btn", "work")
localStorage.setItem("work", 25)
localStorage.setItem("short", 5)
localStorage.setItem("long", 15)

let elements = {
    timer: {
        work: localStorage.getItem("work"),
        short: localStorage.getItem("short"),
        long: localStorage.getItem("long")
    },
    button: {
        start: document.getElementById("start"),
        pause: document.getElementById("pause"),
        reset: document.getElementById("reset"),
    },
    text: {
        mins: document.getElementById("mins"),
        secs: document.getElementById("secs"),
        message: document.getElementById("message"),
        interval: document.getElementById("interval")
    },
    sound: {
        bell: new Audio("assets/audio/bell.mp3"),
        click: new Audio("assets/audio/click.mp3"),
    },
    form: {
        main: document.querySelector("form"),
        workInput: document.getElementById("workTime"),
        shortInput: document.getElementById("shortTime"),
        longInput: document.getElementById("longTime")
    },
}

// Define constant to user
elements.text.mins.textContent = localStorage.getItem("work");
elements.text.secs.textContent = "00";

elements.form.workInput.value = localStorage.getItem("work");
elements.form.shortInput.value = localStorage.getItem("short");
elements.form.longInput.value = localStorage.getItem("long");

let initial, totalsecs, perc, paused, globalInterval, minutes, seconds;

globalInterval = 0;

elements.button.start.addEventListener("click", () => {
    elements.sound.click.play();
    
    let btn = localStorage.getItem("btn")

    if(btn === "work") {
        minutes = +localStorage.getItem("work");
    } else if(btn === "short") {
        minutes = +localStorage.getItem("short");
        globalInterval++;
    } else {
        minutes = +localStorage.getItem("long")
        globalInterval = 0;
    }

    seconds = minutes * 60;
    totalsecs = minutes * 60;

    setTimeout(decrementTimer(), 60);

    paused = false;

    elements.text.interval.textContent = "Intervals: "+globalInterval;
});

elements.button.pause.addEventListener("click", () => {
    elements.sound.click.play();

    if(paused === undefined) {
        return;
    } else {
        if(paused) {
            paused = false;
            initial = setTimeout("decrementTimer()", 60);
            elements.button.pause.textContent = "Stop";
        } else {
            clearTimeout(initial);
            elements.textContent = "Resume";
            paused = true;
        }
    }
});

elements.button.reset.addEventListener("click", () => {
    elements.sound.click.play();
    location.reload();
});

elements.form.main.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.setItem("work", elements.form.workInput.value);
    localStorage.setItem("short", elements.form.shortInput.value);
    localStorage.setItem("long", elements.form.longInput.value);
});

function decrementTimer() {
    elements.text.mins.textContent = Math.floor(seconds / 60);
    elements.text.secs.textContent = seconds % 60 > 9 ? seconds % 60: `0${seconds % 60}`;

    if(seconds > 0) {
        seconds--;
        initial = window.setTimeout("decrementTimer()", 1000);
    } else {
        elements.sound.bell.play();
        
        minutes = 0;
        seconds = 0;

        let btn = localStorage.getItem("btn");

        if(btn === "work") {
            
            if(globalInterval >= 4){
                elements.button.start.textContent = "Start long break";
        
                document.body.classList.remove("work");
                document.body.classList.remove("short");
                document.body.classList.add("long");

                localStorage.setItem("btn", "long");
            } else {
                elements.button.start.textContent = "Start break";

                document.body.classList.remove("work");
                document.body.classList.remove("long");
                document.body.classList.add("short");
                localStorage.setItem("btn", "short");
            }
            
        } else {
            elements.button.start.textContent = "Start work";
            elements.button.start.classList.add("work");
            
            document.body.classList.remove("long");
            document.body.classList.remove("short");
            document.body.classList.add("work");

            localStorage.setItem("btn", "work");
        }
    }
}