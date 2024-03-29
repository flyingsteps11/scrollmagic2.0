var $word = $("path#word");
var $dot = $("path#dot");

function pathPrepare($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dasharray", lineLength);
    $el.css("stroke-dashoffset", lineLength);
}

const flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y: -20},
        {x: 300, y: 10},
        {x: 500, y: 100},
        {x: 750, y: -100},
        {x: 350, y: -50},
        {x: 600, y: 100},
        {x: 800, y: 0},
        {x: window.innerWidth, y: -150}
    ]
}
const tween = new TimelineLite();
tween.add(
    TweenLite.to('.paper-plane', 1, {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
)
const tween2 = new TimelineMax()
    .add(TweenMax.to($word, 0.9, {strokeDashoffset: 0, ease: Linear.easeNone})) // draw word for 0.9
    .add(TweenMax.to($dot, 0.1, {strokeDashoffset: 0, ease: Linear.easeNone}))  // draw dot for 0.1
    .add(TweenMax.to("path", 1, {stroke: "#33629c", ease: Linear.easeNone}), 0);

const tween3 = new TimelineMax()
    // animate to second panel
    .to("#slideContainer", 0.5, {z: -150})        // move back in 3D space
    .to("#slideContainer", 1, {x: "-25%"})    // move in to first panel
    .to("#slideContainer", 0.5, {z: 0})            // move back to origin in 3D space
    // animate to third panel

    .to("#slideContainer", 0.5, {z: -150, delay: 1})
    .to("#slideContainer", 1, {x: "-50%"})
    .to("#slideContainer", 0.5, {z: 0})
    // animate to forth panel
    .to("#slideContainer", 0.5, {z: -150, delay: 1})
    .to("#slideContainer", 1, {x: "-75%"})
    .to("#slideContainer", 0.5, {z: 0});

const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
    triggerElement: ".animation",
    duration: 3000,
    triggerHook: 0,
})
    .setTween(tween)
    .setPin('.animation')
    .addTo(controller);

const scene2 = new ScrollMagic.Scene({
    triggerElement: ".animation2",
    duration: 3,
    tweenChanges: true,
    delay: 321,
})
    .setTween(tween2)
    .addTo(controller);

const scene3 = new ScrollMagic.Scene({
    triggerElement: "#pinContainer",
    triggerHook: "onLeave",
    duration: "500%"
})
    .setPin("#pinContainer")
    .setTween(tween3)
    .addTo(controller);

const intro = document.querySelector(".intro");
const video = intro.querySelector('video');
const text = intro.querySelector('h1');

const section = document.querySelector(".intro__wrapper");
const end = section.querySelector('h1');

let scene4 = new ScrollMagic.Scene({
    duration: 6000,
    triggerElement: intro,
    triggerHook: 0
})
    .setPin(intro)
    .addTo(controller);


const textAnimation = TweenMax.fromTo(text, 3, {opacity: 1}, {opacity: 0});


let scene5 = new ScrollMagic.Scene({
    duration: 2000,
    triggerElement: intro,
    triggerHook: 0
})
    .setTween(textAnimation)
    .addTo(controller);


//video

let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene4.on("update", e => {
    scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
    delay += (scrollpos - delay) * accelamount;
    video.currentTime = delay;
    //console.log(video.currentTime);
},)
//
//
// const canvas = document.getElementById("hero-lightpass");
// const context = canvas.getContext("2d");
//
// canvas.width = 1158;
// canvas.height = 770;
//
// const frameCount = 147;
// const currentFrame = index => (
//     `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
// );
//
// const images = []
// const airpods = {
//     frame: 0
// };
//
// for (let i = 0; i < frameCount; i++) {
//     const img = new Image();
//     img.src = currentFrame(i);
//     images.push(img);
// }
//
// gsap.to(airpods, {
//     frame: frameCount - 1,
//     snap: "frame",
//     scrollTrigger: {
//         scrub: 0.5
//     },
//     onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
// });
//
// images[0].onload = render;
//
// function render() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.drawImage(images[airpods.frame], 0, 0);
// }
//


//typing text
document.addEventListener('DOMContentLoaded', () => {
    let textBox = document.querySelector('.type-text'),
        text = textBox.innerText,
        newHTML = '';

    function init() {
        for (i = 0; i < text.length; i++) {
            if (text[i] == "\r" || text[i] == "\n") {
                newHTML += '<br>';
            } else {
                newHTML += '<span>' + text[i] + '</span>';
            }
        }
        textBox.innerHTML = newHTML;

        let spans = textBox.querySelectorAll('span'),
            count = 0,
            timeout = 150;

        function typing_text() {
            spans[count].classList.add('visible');
            if (count < spans.length - 1) {
                setTimeout(() => {
                    count++;
                    typing_text();
                }, timeout);
            } else {
                setTimeout(() => {
                    newHTML = '';
                    init();
                }, 2000);

            }
        }

        typing_text();
    }

    init();
});
//


//img-compare
const clippedImage = document.querySelector('.image-2');
const clippingSlider = document.querySelector('.image-compare-input');

clippingSlider.addEventListener('input', (event) => {
    const newValue = `${event.target.value}%`
    clippedImage.style.setProperty('--exposure', newValue)
})
//
//анимирование парня
//
// const scene = new ScrollMagic.Scene({
//     triggerElement: ".animation",
//     duration: 3000,
//     triggerHook: 0,
// })
//     .setTween(tween)
//     .setPin('.animation')
//     .addTo(controller);

let $block1 = $(".block1");
let $block2 = $(".block2");
let $block3 = $('.block3');
let $block4 = $('.block5');
// const tween10 = new TimelineMax()
//     .add(TweenMax.to($block1, 0.9, {width: 60, ease: Linear.easeNone})) // draw word for 0.9

const tween10 = TweenMax.fromTo($block1, 3, {opacity: 1}, {opacity: 0});
const tween11 = TweenMax.fromTo($block2, 1.4, {width: 1}, {width: 99});
const tween12 = TweenMax.fromTo($block4, 1.4, {x1: 0}, {x1: -22.6908})
const scene6 = new ScrollMagic.Scene({
    triggerElement: '.man-animation',
    duration: 3,
    tweenChanges: true,
    delay: 321,
})
    .setTween(tween10, tween11, tween12)

    .addIndicators()
    .addTo(controller);

// $(".wrapper").onepage_scroll({
//     sectionContainer: "intro", // контейнер, к которому будет применяться скролл
//     easing: "ease", // Тип анимации "ease", "linear", "ease-in", "ease-out", "ease-in-out"
//     animationTime: 1000, // время анимации
//     pagination: false, // скрыть или отобразить пагинатор
//     updateURL: false // обновлять URL или нет
// });
