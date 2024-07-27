// awesome sauce

// variables
let timeRemaining = 124; // default time in seconds
let timerReady = true; // debounce for start button
let interval; // id for setInterval
let switchSoundsEnabled = false;
//audio
let startSound = new Audio("audio/VEX IQ countdown.mp3");
let endSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-end-sound.mp3");
let switchSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-driver-switch-sound.mp3");
switchSound.volume = 0.7; // volume
let shortBeep = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Short-beep.mp3");
let lastCount = new Audio("audio/final countdown.mp3");

// functions

//Match timer
function timerCount() {
    if ((timeRemaining == 56 || timeRemaining == 66) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <= 120) {
        if (!(timerReady)) {
            timerText.innerHTML = timeRemaining.toString() + " seconds";
        }
    }
    if (timeRemaining == 10) {
        lastCount.play(); // Play end countdown
    }
}

function timerStart() {
    if (timerReady) {
        startSound.play();
        timerReady = false;
        timerCount();
        interval = setInterval(timerCount, 1000); // Run timerCount() every second
    }
}

function timerStop() {
    if (!(timerReady)) {
        timerReady = true;
        clearInterval(interval); // stop calling timerCount
    }
}

function timerReset() {
    timerReady = true;
    clearInterval(interval);
    timeRemaining = 64;
    if (timeRemaining <= 60) {
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 60) {
        timerText.innerHTML = "60 seconds";
    }
}

function switchCountdown() {
    if (timerReady) {
        switchSoundsEnabled = switchSoundsEnabled ? false : true;
        if (switchSoundsEnabled) {
            countdownSwitch.innerHTML = "Disable Switch Sounds"
        } else {
            countdownSwitch.innerHTML = "Enable Switch Sounds"
        }
    }
}

function showScore() {
    timerContainer.style.display = "none";
    scoreContainer.style.display = "flex";
}

//Score calculator

function calculateScores(inputRef) {
    if (inputRef) {
        const minVal = inputRef.getAttribute("min");
        const maxVal = inputRef.getAttribute("max");
        const defVal = inputRef.getAttribute("placeholder");

        var minNum = parseInt(minVal);
        var maxNum = parseInt(maxVal);

        if (parseInt(inputRef.value) > maxNum || parseInt(inputRef.value) < minNum) {
            inputRef.value = defVal;
        }
    }

    let score1 = 0;
    let score2 = 0;

    const partial1 = parseInt(document.getElementById("partial-tnt-t1").value) || 0;
    const full1 = parseInt(document.getElementById("full-tnt-t1").value) || 0;
    const doubler1 = document.getElementById("doubler-t1").checked ? 1 : 0;
    const unstacked1 = parseInt(document.getElementById("unstacked-t1").value) || 0;
    const twoStack1 = parseInt(document.getElementById("2-stack-t1").value) || 0;
    const threeStack1 = parseInt(document.getElementById("3-stack-t1").value) || 0;
    const endgame1 = (document.getElementById("endgame-t1").value) || 0;

    const partial2 = parseInt(document.getElementById("partial-tnt-t2").value) || 0;
    const full2 = parseInt(document.getElementById("full-tnt-t2").value) || 0;
    const doubler2 = document.getElementById("doubler-t2").checked ? 1 : 0;
    const unstacked2 = parseInt(document.getElementById("unstacked-t2").value) || 0;
    const twoStack2 = parseInt(document.getElementById("2-stack-t2").value) || 0;
    const threeStack2 = parseInt(document.getElementById("3-stack-t2").value) || 0;
    const endgame2 = (document.getElementById("endgame-t2").value) || 0;

    const scoreKey = [1, 2, 1, 1, 2, 3, 5];

    let matchData1 = [
        partial1,
        full1,
        doubler1,
        unstacked1,
        twoStack1,
        threeStack1,
        endgame1
    ];

    let matchData2 = [
        partial2,
        full2,
        doubler2,
        unstacked2,
        twoStack2,
        threeStack2,
        endgame2
    ];

    for (let i = 0; i < scoreKey.length; i++) {
        if (i === 2) { // Handle doubler
            score1 = score1 * (doubler1 + 1);
            score2 = score2 * (doubler2 + 1);
        } else {
            score1 += matchData1[i] * scoreKey[i];
            score2 += matchData2[i] * scoreKey[i];
        }
    }

    document.getElementById("score-t1").style.color = "black";
    document.getElementById("score-t1").innerHTML = "Score: " + score1.toString();

    document.getElementById("score-t2").style.color = "black";
    document.getElementById("score-t2").innerHTML = "Score: " + score2.toString();
}

function clearFields() {
    document.getElementById("partial-tnt-t1").value = "";
    document.getElementById("full-tnt-t1").value = "";
    document.getElementById("doubler-t1").checked = false;
    document.getElementById("unstacked-t1").value = "";
    document.getElementById("2-stack-t1").value = "";
    document.getElementById("3-stack-t1").value = "";
    document.getElementById("endgame-t1").checked = false;

    document.getElementById("partial-tnt-t2").value = "";
    document.getElementById("full-tnt-t2").value = "";
    document.getElementById("doubler-t2").checked = false;
    document.getElementById("unstacked-t2").value = "";
    document.getElementById("2-stack-t2").value = "";
    document.getElementById("3-stack-t2").value = "";
    document.getElementById("endgame-t2").checked = false;

    calculateScores();
}

function showTimer() {
    scoreContainer.style.display = "none";
    timerContainer.style.display = "flex";
}

// button events
window.addEventListener("DOMContentLoaded", function () {
    // timer variables
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const countdownSwitch = document.getElementById("countdownSwitch");
    const scoreSwitch = document.getElementById("scoreSwitch");
    const timerText = this.document.getElementById("timerText");

    // score variables
    const partial1 = document.getElementById("partial-tnt-t1");
    const full1 = document.getElementById("full-tnt-t1");
    const doubler1 = document.getElementById("doubler-t1");
    const unstacked1 = document.getElementById("unstacked-t1");
    const twoStack1 = document.getElementById("2-stack-t1");
    const threeStack1 = document.getElementById("3-stack-t1");
    const endgame1 = document.getElementById("endgame-t1");

    const partial2 = document.getElementById("partial-tnt-t2");
    const full2 = document.getElementById("full-tnt-t2");
    const doubler2 = document.getElementById("doubler-t2");
    const unstacked2 = document.getElementById("unstacked-t2");
    const twoStack2 = document.getElementById("2-stack-t2");
    const threeStack2 = document.getElementById("3-stack-t2");
    const endgame2 = document.getElementById("endgame-t2");

    const clearBtn = document.getElementById("clearBtn");
    const timerSwitch = document.getElementById("timerSwitch");

    if (startBtn) { // Check if buttons loaded on browser
        // timer events
        startBtn.addEventListener("click", timerStart);
        stopBtn.addEventListener("click", timerStop);
        resetBtn.addEventListener("click", timerReset);
        countdownSwitch.addEventListener("click", switchCountdown);
        scoreSwitch.addEventListener("click", showScore);
        // score events
        const elements = [
            { elem: partial1, type: '' },
            { elem: full1, type: '' },
            { elem: doubler1, type: 'checkbox' },
            { elem: unstacked1, type: '' },
            { elem: twoStack1, type: '' },
            { elem: threeStack1, type: '' },
            { elem: endgame1, type: 'checkbox' },
            { elem: partial2, type: '' },
            { elem: full2, type: '' },
            { elem: doubler2, type: 'checkbox' },
            { elem: unstacked2, type: '' },
            { elem: twoStack2, type: '' },
            { elem: threeStack2, type: '' },
            { elem: endgame2, type: 'checkbox' },
        ];

        elements.forEach(item => {
            const { elem, type } = item;
            if (type === "checkbox") {
                elem.addEventListener("change", () => calculateScores(elem));
            } else {
                elem.addEventListener("keyup", () => calculateScores(elem));
                elem.addEventListener("change", () => calculateScores(elem));
            }
        });

        // score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }
});