const questionScreen = document.getElementById("questionScreen");
const dateScreen = document.getElementById("dateScreen");
const activityScreen = document.getElementById("activityScreen");
const finalScreen = document.getElementById("finalScreen");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const questionCat = document.getElementById("questionCat");
const message = document.getElementById("message");

const dateInput = document.getElementById("dateInput");
const dateNextBtn = document.getElementById("dateNextBtn");

const activityButtons =
    document.querySelectorAll(".activity-btn");

const lockBtn = document.getElementById("lockBtn");

const finalDate = document.getElementById("finalDate");
const finalActivity = document.getElementById("finalActivity");

const loveNoteBtn =
    document.getElementById("loveNoteBtn");

const loveOverlay =
    document.getElementById("loveOverlay");

const closeNote =
    document.getElementById("closeNote");

const hearts =
    document.getElementById("hearts");


let selectedDate = "";
let selectedActivity = "";

let noClicks = 0;
let yesScale = 1;


/* =========================================
   CHANGE SCREEN
========================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {
            item.classList.remove("active");
        });

    screen.classList.add("active");
}


/* =========================================
   FLOATING HEARTS
========================================= */

function createHeart() {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.style.left =
        Math.random() * 100 + "%";

    const size =
        Math.floor(Math.random() * 18) + 15;

    heart.style.width =
        size + "px";

    heart.style.height =
        size + "px";

    const duration =
        Math.random() * 4 + 5;

    heart.style.animationDuration =
        duration + "s";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}


/* Create hearts continuously */

setInterval(() => {
    createHeart();
}, 900);


/* =========================================
   NO BUTTON
========================================= */

noBtn.addEventListener("click", () => {

    noClicks++;

    questionCat.src =
        "assets/cat_sad.png";


    if (noClicks === 1) {

        message.textContent =
            "I'm gonna cry... 🥺";

    } else if (noClicks === 2) {

        message.textContent =
            "Are you sure? 🥺";

    } else if (noClicks === 3) {

        message.textContent =
            "Pleaseeee... 💔";

    } else {

        message.textContent =
            "The YES button is getting bigger 😭";
    }


    yesScale += 0.15;

    yesBtn.style.transform =
        `scale(${yesScale})`;
});


/* =========================================
   YES BUTTON
========================================= */

yesBtn.addEventListener("click", () => {

    showScreen(dateScreen);

});


/* =========================================
   DATE INPUT
========================================= */

/* Don't allow dates from the past */

const today =
    new Date().toISOString().split("T")[0];

dateInput.min = today;


dateInput.addEventListener("change", () => {

    selectedDate =
        dateInput.value;

    if (selectedDate) {

        dateNextBtn.disabled = false;

    } else {

        dateNextBtn.disabled = true;

    }

});


/* =========================================
   DATE → ACTIVITY
========================================= */

dateNextBtn.addEventListener("click", () => {

    if (!selectedDate) {
        return;
    }

    showScreen(activityScreen);

});


/* =========================================
   ACTIVITY SELECTION
========================================= */

activityButtons.forEach(button => {

    button.addEventListener("click", () => {

        activityButtons.forEach(item => {
            item.classList.remove("selected");
        });


        button.classList.add("selected");


        selectedActivity =
            button.dataset.activity;


        lockBtn.disabled = false;

    });

});


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );
}


/* =========================================
   LOCK IT IN
========================================= */

lockBtn.addEventListener("click", () => {

    if (!selectedDate || !selectedActivity) {
        return;
    }


    finalDate.textContent =
        formatDate(selectedDate);

    finalActivity.textContent =
        selectedActivity;


    showScreen(finalScreen);


    /* Celebration hearts */

    for (let i = 0; i < 35; i++) {

        setTimeout(() => {
            createHeart();
        }, i * 70);

    }

});


/* =========================================
   LOVE NOTE POPUP
========================================= */

loveNoteBtn.addEventListener("click", () => {

    loveOverlay.classList.add("show");


    /* More hearts */

    for (let i = 0; i < 20; i++) {

        setTimeout(() => {
            createHeart();
        }, i * 80);

    }

});


/* =========================================
   CLOSE LOVE NOTE
========================================= */

closeNote.addEventListener("click", () => {

    loveOverlay.classList.remove("show");

});


/* =========================================
   CLICK OUTSIDE LETTER
========================================= */

loveOverlay.addEventListener("click", (event) => {

    if (event.target === loveOverlay) {

        loveOverlay.classList.remove("show");

    }

});