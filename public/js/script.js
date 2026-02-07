const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    french: [
        "Non",
        "Tu es sûr ?",
        "Tu es vraiment sûr ??",
        "Tu es vraiment vraiment sûr ???",
        "Réfléchis encore?",
        "Tu ne crois pas aux deuxièmes chances ?",
        "Pourquoi tu es si froid?",
        "Peut-être, on peut en parler ?",
        "Je ne vais pas demander encore une fois!",
        "D'accord, maintenant ca me fait mal!",
        "Tu es juste méchant!",
        "Pourquoi tu me fais ça?",
        "Donnez-moi une chance plz!",
        "Je te supplie d'arrêter!",
        "D'accord, recommençons.."
    ],
    thai: [
        "ไม่อ่ะ",
        "แน่ใจจริงๆหรอคะ?",
        "แน่ใจจริงๆ จริงๆนะคะ?",
        "อย่าบอกนะว่านี่แน่ใจสุดๆแล้วจริงๆ ?",
        "ลองคิดดูอีกทีหน่อยสิคะ..",
        "ขอโอกาศที่สองทีค่ะ..",
        "อย่าเย็นชาสิคะ กระซิกๆ",
        "ขอร้องนะคะ",
        "น้าาาๆๆๆๆๆ",
        "เราจะร้องไห้เอานะ กระซิกๆ",
        "จะเอางี้ๆจริงหรอคะ",
        "ฮือออออ",
        "ขอโอกาศครั้งที่สองที่ค่ะ!",
        "ขอร้องละค่าาา",
        "โอเคค่ะ.. งั้นเริ่มใหม่ !"
    ]
};

answers_yes = {
    "english": "Yes",
    "french": "Oui",
    "Thailand": "เย่ คืนดีกันแล้วน้า"
}

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

const no_images = [
    "public/images/sunonasuno.gif",
    "public/images/no.gif",
    "public/images/haulehaule.webp",
    "public/images/broken-heart.gif"
];

const sad_headings = [
    "Please reconsider? 🥺",
    "Don't do this to me! 😭",
    "But I love you! 💔",
    "Why are you so cold? ❄️",
];

const no_songs = [
    "public/audio/no.mp3",
    "public/audio/zaalima.mp3",
    "public/audio/haulehaule.mp3",
    "public/audio/chaltechalte.mp3"
];

no_button.addEventListener('click', () => {
    if (yes_clicks > 0) return; // Block click if in Yes flow

    // Stop yes sound if playing
    const yesSound = document.getElementById('yes-sound');
    yesSound.pause();
    yesSound.currentTime = 0;

    // Play no sound
    const noSound = document.getElementById('no-sound');
    const songIndex = clicks % no_songs.length;
    noSound.src = no_songs[songIndex];
    noSound.play();
    
    // Change banner source to the next image in the list
    let banner = document.getElementById('banner');
    const imageIndex = clicks % no_images.length;
    banner.src = no_images[imageIndex];
    
    // Add shake animation
    banner.classList.add('shake');
    setTimeout(() => {
        banner.classList.remove('shake');
    }, 500); // Remove after animation duration

    refreshBanner();

    // Change heading text
    const questionHeading = document.getElementById("question-heading");
    const headingIndex = clicks % sad_headings.length;
    questionHeading.textContent = sad_headings[headingIndex];

    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

let yes_clicks = 0;

no_button.addEventListener('mouseover', () => {
    if (yes_clicks > 0) {
        const x = Math.random() * (window.innerWidth - no_button.offsetWidth);
        const y = Math.random() * (window.innerHeight - no_button.offsetHeight);
        no_button.style.position = 'absolute';
        no_button.style.left = `${x}px`;
        no_button.style.top = `${y}px`;
    }
});

yes_button.addEventListener('click', () => {
    // Stop no sound if playing
    const noSound = document.getElementById('no-sound');
    noSound.pause();
    noSound.currentTime = 0;

    if (yes_clicks === 0) {
        // First Yes Click: Are you sure?
        
        // Play confirm sound
        const yesSound = document.getElementById('yes-sound');
        yesSound.src = "public/audio/koimilgaya.mp3";
        yesSound.play();
        
        // Change banner gif path
        let banner = document.getElementById('banner');
        banner.src = "public/images/koimilgaya.gif";
        refreshBanner();
        
        // Change heading
        document.getElementById("question-heading").textContent = "Are you serioussswssswes ?!!!";
        
        // Reset button size
        yes_button.style.height = "50px";
        yes_button.style.width = "auto"; // Allow width to adjust to text or set to specific value
        // actually existing code sets width to 50px initially but the text might be longer now?
        // Let's stick to cleaning up the inline styles so it reverts to CSS or just set it back to 50ish if that's the design.
        // The original code uses `size` variable.
        yes_button.style.height = "50px";
        yes_button.style.width = "auto"; 
        size = 50;

        // Reset No button text
        no_button.innerHTML = answers_no[language][0];
        i = 1; // Reset answer index

        // Increment click count
        yes_clicks++;
    } else {
        // Second Yes Click: Success
        
        // Play yes sound
        const yesSound = document.getElementById('yes-sound');
        yesSound.src = "public/audio/tenuleke.mp3";
        yesSound.play();
        
        // change banner gif path
        let banner = document.getElementById('banner');
        banner.src = "public/images/yes.gif";
        refreshBanner();
        
        // Change heading
        document.getElementById("question-heading").textContent = "YAAASSSSS!!!! 💖🥳";
        // hide buttons div
        let buttons = document.getElementsByClassName('buttons')[0];
        buttons.style.display = "none";
        
        // show message div
        let message = document.getElementsByClassName('message')[0];
        message.style.display = "block";
    }
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Tu veux être mon valentin?";
    } else if (language === "thai") {
        questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        no_button.innerHTML = answers_no[language][clicks];
    }

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Yepppie, à bientôt :3";
    } else if (language === "thai") {
        successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
    } else {
        successMessage.textContent = "Yepppie, see you sooonnn :3";
    }
}