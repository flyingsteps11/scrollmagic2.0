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

