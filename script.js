// awesome sauce

// variables
let timeRemaining = 64; // default time in seconds
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
    if ((timeRemaining == 26 || timeRemaining == 36) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <= 60) {
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

function calculateScores(inputRef, type) {
    if (type == 1) { // input type is numerical
        if (inputRef) { // ensure values only within the declared min and max are inputted
            const minVal = inputRef.getAttribute("min");
            const maxVal = inputRef.getAttribute("max");
            const defVal = inputRef.getAttribute("placeholder");

            var minNum = parseInt(minVal);
            var maxNum = parseInt(maxVal);

            if (parseInt(inputRef.value) > maxNum || parseInt(inputRef.value) < minNum) {
                inputRef.value = defVal;
            }
        }
    }

    let score = 0;

    let scoreInvalid = false;
    const pieceCount = document.getElementById("piece-count").value;
    const turtleCount = document.getElementById("turtle-count").value;
    const coopSwitch = document.getElementById("coop-switch");
    const switchCount = document.getElementById("switch-count").value;
    const quarter = document.getElementById("quarter");
    const half = document.getElementById("half");
    const threeQuarters = document.getElementById("three-quarters");
    const full = document.getElementById("full");

    let matchData = [
        pieceCount,
        turtleCount,
        switchCount,
    ];


    matchData = matchData.map(function (currentElement) {
        return currentElement === "" ? 0 : parseInt(currentElement);
    });

    if (matchData[0] !== 0 ){
        if (quarter.checked) {
            score += (1 + matchData[0]);
        }
        else if (half.checked) {
            score += (4 + matchData[0]);
        }
        else if (threeQuarters.checked) {
            score += (9 + matchData[0]);
        }
        else if (full.checked) {
            score += 20;
        }
        else {
            score += matchData[0];
        }
    }

    if (coopSwitch.checked) {
        score += matchData[2] * 10;
    }
    else {
        score += matchData[2] * 5;
    }

    score += turtleCount * 3;

    document.getElementById("score").style.color = "black";
    document.getElementById("score").innerHTML = "Score: " + score.toString();
}

function clearFields() {
    document.getElementById("piece-count").value = "";
    document.getElementById("turtle-count").value = "";
    document.getElementById("coop-switch").checked = false;
    document.getElementById("switch-count").value = "";
    document.getElementById("quarter").checked = false;
    document.getElementById("half").checked = false;
    document.getElementById("three-quarters").checked = false;
    document.getElementById("full").checked = false;
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
    const pieceCount = document.getElementById("piece-count");
    const turtleCount = document.getElementById("turtle-count");
    const coopSwitch = document.getElementById("coop-switch");
    const switchCount = document.getElementById("switch-count");
    const quarter = document.getElementById("quarter");
    const half = document.getElementById("half");
    const threeQuarters = document.getElementById("three-quarters");
    const full = document.getElementById("full");
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
        pieceCount.addEventListener("keyup", () => calculateScores(pieceCount, 1));
        pieceCount.addEventListener("change", () => calculateScores(pieceCount, 1));

        turtleCount.addEventListener("keyup", () => calculateScores(turtleCount, 1));
        turtleCount.addEventListener("change", () => calculateScores(turtleCount, 1));

        coopSwitch.addEventListener("change", () => calculateScores(coopSwitch, 2));

        switchCount.addEventListener("keyup", () => calculateScores(switchCount, 1));
        switchCount.addEventListener("change", () => calculateScores(switchCount, 1));

        quarter.addEventListener("change", () => calculateScores(quarter, 2));
        half.addEventListener("change", () => calculateScores(half, 2));
        threeQuarters.addEventListener("change", () => calculateScores(threeQuarters, 2));
        full.addEventListener("change", () => calculateScores(full, 2));

        // score buttons
        clearBtn.addEventListener
        timerSwitch.addEventListener("click", showTimer);
    }
});

function check(input) {

    var checkboxes = document.getElementsByClassName('checkbox');

    // uncheck previously check button
    if (input.checked === false) {
        input.checked = false;
    }
    else {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true) {
                checkboxes[i].checked = false;
            }
        }

        input.checked = true;
    }

}
