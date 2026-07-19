// ==========================================================
// INITIALIZATION
// ==========================================================

AOS.init({
    duration: 1000,
    once: true
});

// ==========================================================
// ELEMENTS
// ==========================================================

const loader = document.getElementById("loader");
const welcome = document.getElementById("welcome");
const hero = document.getElementById("hero");


const openBtn = document.getElementById("openBtn");
const continueBtn = document.getElementById("continueBtn");

const loveLetter = document.getElementById("loveLetter");
const envelope = document.getElementById("envelope");
const flap = document.querySelector("#envelope .flap");
const letter = document.getElementById("letter");
const letterContent = document.querySelector(".letter-content");
const memoryBtn = document.getElementById("memoryBtn");
const birthdaySong =document.getElementById("birthdaySong");
const backgroundMusic =document.getElementById("backgroundMusic");
// ==========================================================
// INITIAL STATE
// ==========================================================

hero.style.display = "none";
loveLetter.style.display = "none";

// ==========================================================
// LOADER
// ==========================================================

window.addEventListener("load", () => {

    setTimeout(() => {

        gsap.to(loader, {

            opacity: 0,
            duration: 1,

            onComplete: () => {

                loader.style.display = "none";

            }

        });

    }, 3000);

});

// ==========================================================
// OPEN SURPRISE
// ==========================================================

openBtn.addEventListener("click", () => {
    backgroundMusic.play();

    gsap.to(welcome, {

        opacity: 0,
        scale: .95,
        duration: .8,

        onComplete: () => {

            welcome.style.display = "none";

            hero.style.display = "flex";

            gsap.from(hero, {

                opacity: 0,
                y: 40,
                scale: 1.05,
                duration: 1.2,
                ease: "power3.out"

            });

        }

    });

});

// ==========================================================
// HERO -> LOVE LETTER
// ==========================================================

continueBtn.addEventListener("click", () => {


    gsap.to(hero, {

        opacity: 0,
        duration: 0.7,

        onComplete: () => {

            hero.style.display = "none";

            loveLetter.style.display = "flex";

            gsap.from(".letter-scene", {

                y: 150,
                opacity: 0,
                duration: 1,
                ease: "power3.out"

            });

        }

    });

});

// ==========================================================
// ENVELOPE OPEN
// ==========================================================

let opened = false;

envelope.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    const tl = gsap.timeline();

    // Envelope wiggle before opening
    tl.to(envelope, {
        rotation: -3,
        scale: 0.97,
        duration: 0.15
    })

    .to(envelope, {
        rotation: 3,
        duration: 0.15
    })

    .to(envelope, {
        rotation: 0,
        scale: 1,
        duration: 0.15
    });

    // Open flap slowly
    tl.to(flap, {

        rotateX: -160,
        duration: 0.8,
        ease: "power2.inOut"

    });

    // Letter slowly slides out
    tl.to(letter, {

        opacity: 1,
        y: -360,
        duration: 1.4,
        ease: "power4.out"

    });

    // Envelope disappears
    tl.to(envelope, {

        opacity: 0,
        y: 80,
        duration: 0.5

    });

    // Letter gently settles into the center
    tl.to(letter, {

        y: -190,
        scale: 1.03,
        duration: 0.8,
        ease: "power2.inOut"

    });

    // Show content
    tl.fromTo(letterContent,
    {
        opacity:0,
        y:20
    },
    {
        opacity:1,
        y:0,
        duration:1,
        ease:"power2.out"
    });

});

// ==========================================================
// MEMORY BUTTON
// ==========================================================

const gallery = document.getElementById("gallery");

memoryBtn.addEventListener("click", () => {

    gsap.to(loveLetter, {

        opacity: 0,

        duration: 0.7,

        onComplete: () => {

            loveLetter.style.display = "none";

            gallery.style.display = "block";

            gsap.from("#gallery", {

                opacity: 0,

                y: 80,

                duration: 1

            });

        }

    });

});

// ==========================
// SWIPER
// ==========================

const gallerySwiper = new Swiper(".gallerySwiper", {

    slidesPerView: 1,

    spaceBetween: 20,

    centeredSlides: true,

    pagination: {

        el: ".swiper-pagination",

        clickable: true

    },

    speed: 700

});

// ======================================
// FULL SCREEN PHOTO VIEWER
// ======================================

const photoViewer = document.getElementById("photoViewer");

const viewerImage = document.getElementById("viewerImage");

const closeViewer = document.getElementById("closeViewer");

const photos = document.querySelectorAll(".photo-card img");

photos.forEach(photo=>{

    photo.addEventListener("click",()=>{

        viewerImage.src = photo.src;

        photoViewer.style.display = "flex";

        gsap.fromTo(

            "#viewerImage",

            {

                scale:.8,

                opacity:0

            },

            {

                scale:1,

                opacity:1,

                duration:.4

            }

        );

    });

});

closeViewer.addEventListener("click",()=>{

    photoViewer.style.display="none";

});

photoViewer.addEventListener("click",(e)=>{

    if(e.target===photoViewer){

        photoViewer.style.display="none";

    }

});

const celebration = document.getElementById("celebration");

const nextSection = document.getElementById("nextSection");

nextSection.addEventListener("click",()=>{



    gsap.to(gallery,{

        opacity:0,

        duration:.7,

        onComplete:()=>{

            gallery.style.display="none";

            celebration.style.display="block";

            gsap.from("#celebration",{

                opacity:0,

                y:80,

                duration:1

            });

        }

    });

});

const flames=document.querySelectorAll(".flame");

const blowBtn=document.getElementById("blowBtn");

const finalMessage = document.getElementById("finalMessage");

blowBtn.addEventListener("click",()=>{

    gsap.to(".flame",{

        scale:0,

        opacity:0,

        duration:.4,

        stagger:.1

    });

    gsap.to("#cake",{

        y:-20,

        duration:.6,

        yoyo:true,

        repeat:1

    });

    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;

    birthdaySong.currentTime = 0;

    birthdaySong.play();

    blowBtn.disabled = true;

    blowBtn.style.opacity = ".6";

    blowBtn.style.cursor = "default";

    finalMessage.style.display = "block";

    gsap.from("#finalMessage",{

        opacity:0,

        y:50,

        duration:1

    });

});

const replayBtn = document.getElementById("replayBtn");

replayBtn.addEventListener("click",()=>{

    location.reload();

});