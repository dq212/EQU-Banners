var nameSpace = O2KL || {};

(function () {
  "use strict";

  var timeline;
  var wrapper,
    clickThrough,
    disc_open,
    disc_close,
    logo,
    copy,
    cta,
    width,
    height,
    ids;

  nameSpace.init = function () {
    // Initialize any variables here
    ids = [];

    width = 300;
    height = 250;

    //SET IDs IN DOM TO GLOBAL VARIABLES
    var allElements = document.getElementsByTagName("*");
    //grabs all elements and makes them variables
    for (var q = 0; q < allElements.length; q++) {
      var el = allElements[q];
      if (el.id) {
        window[el.id] = document.getElementById(el.id);
        //separates what we don't want to hide initially
        if (
          el.id !== "wrapper" &&
          el.id !== "click_through" &&
          el.id !== "bg"
        ) {
          ids.push(el);
        }
      }
    }

    // TweenMax.set("#allNums", { autoAlpha: 0 });
    // TweenMax.set(["#athena"], { x: 50, y: 50, autoAlpha: 0 });
    TweenMax.set(["#bg-color"], { x: 0, y: 0, autoAlpha: 0 });
    TweenMax.set(["#copy-1"], { x: 0, y: 0, autoAlpha: 1 });
    // TweenMax.set(["#line"], { x: 0, y: 1, autoAlpha: 1 });
    TweenMax.set(
      [
        "#btn_disclosure",
        "#disclosure",
        "#copy-3-b",
        "#copy-3-c",
        "#copy-4",
        "#cta",
        "#img-2",
      ],
      {
        x: 0,
        autoAlpha: 0,
      }
    );
    // TweenMax.set(['#cta', '#code'], { autoAlpha: 0 });
    wrapper = nameSpace.$("#wrapper");
    clickThrough = document.getElementById("click_through");
    disc_open = document.getElementById("btn_disclosure");
    disc_close = document.getElementById("close");
    cta = nameSpace.$("#cta");
    /* end added by me */

    wrapper.addClass("show");

    nameSpace.initClickTag();
    nameSpace.initAnimation();

    if (nameSpace.useFallback()) {
      nameSpace.injectFallback();
    } else {
      nameSpace.startAnimation();
    }

    // click_through.onmouseover = function() {
    //     TweenMax.to("#cta", 0.1, {
    //         scale: 1.05,
    //         y: 0,
    //         transformOrigin: "25% 90%",
    //         rotationZ: 0.01,
    //         force3D: true,
    //         transformPerspective: 400,
    //     });
    // };

    // click_through.onmouseout = function() {
    //     TweenMax.to("#cta", 0.1, {
    //         scale: 1,
    //         force3D: true,
    //         z: 0.01,
    //         rotationZ: 0.01,
    //         transformPerspective: 400,
    //         y: 0,
    //     });
    // };

    // disc_open.onmouseover = function() {
    //     TweenMax.to("#btn_disclosure", 0.1, {
    //         scale: 1.05,
    //         y: 0,
    //         transformOrigin: "75% 90%",
    //         rotationZ: 0.01,
    //         force3D: true,
    //         transformPerspective: 400,
    //     });
    // };

    // disc_open.onmouseout = function() {
    //     TweenMax.to("#btn_disclosure", 0.1, {
    //         scale: 1,
    //         force3D: true,
    //         z: 0.01,
    //         rotationZ: 0.01,
    //         transformPerspective: 400,
    //         y: 0,
    //     });
    // };
  };

  nameSpace.initClickTag = function () {
    clickThrough.onclick = function () {
      window.open(window.clickTag);
    };

    disc_open.onclick = function () {
      TweenMax.killTweensOf("#cta");
      TweenMax.set("#disclosure", { autoAlpha: 1 });
      TweenMax.set("#btn_disclosure", { autoAlpha: 0 });
      TweenMax.set(["#cta", "#copy-3", "#copy-4"], { autoAlpha: 0 });
    };
    disc_close.onclick = function () {
      TweenMax.set("#disclosure", { autoAlpha: 0 });
      TweenMax.set("#btn_disclosure", { autoAlpha: 1 });
      TweenMax.set(["#cta", "#copy-3", "#copy-4"], { autoAlpha: 1 });
    };
  };

  nameSpace.injectFallback = function () {
    var body = document.body;

    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }

    var anchor = document.createElement("a");
    anchor.style.cursor = "pointer";

    /*var img = new Image();
        img.src = "./img/static.gif";*/

    anchor.appendChild(img);
    anchor.onclick = function () {
      window.open(window.clickTag);
    };
    document.body.appendChild(anchor);
  };

  nameSpace.initAnimation = function () {
    // TweenMax can be used to set css
    // It will even take care of browser prefixes
    // TweenMax.set(logo, {x:100, y:50, opacity:0});

    timeline = new TimelineMax({
      delay: 0.5,
      onComplete: nameSpace.onAnimationComplete,
    });

    timeline.pause();

    timeline

      .fromTo(
        ["#blue-3"],
        1,
        {
          transformPerspective: 400,
          autoAlpha: 1,
          x: width,
          force3D: true,
          rotationZ: 0.01,
          ease: Power2.easeInOut,
        },
        {
          transformPerspective: 400,
          x: 0,
        },
        "+=0"
      )

      .fromTo(
        ["#blue-2"],
        1,
        {
          transformPerspective: 400,
          autoAlpha: 1,
          y: height,
          force3D: true,
          rotationZ: 0.01,
          ease: Power2.easeInOut,
        },
        {
          transformPerspective: 400,
          y: 0,
        },
        "-=.9"
      )

      .fromTo(
        ["#copy-1"],
        0.8,
        {
          transformPerspective: 400,
          autoAlpha: 0,
          x: "-25",
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeInOut,
        },
        {
          transformPerspective: 400,
          autoAlpha: 1,
          x: 0,
        },
        "-=0.4"
      )

      .to(
        ["#copy-1", "#legal"],
        0.4,
        {
          transformPerspective: 400,
          autoAlpha: 0,
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeNone,
        },
        "+=2"
      )

      .fromTo(
        ["#copy-2"],
        0.8,
        {
          transformPerspective: 400,
          autoAlpha: 0,
          x: "-25",
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeInOut,
        },
        {
          transformPerspective: 400,
          autoAlpha: 1,
          x: 0,
        }
      )

      .to(
        ["#copy-2"],
        0.4,
        {
          transformPerspective: 400,
          autoAlpha: 0,
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeNone,
        },
        "+=2"
      )

      .to(
        ["#blue-1"],
        0.4,
        {
          y: 23,
          transformPerspective: 400,
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeNone,
        },
        "-=0.4"
      )

      .fromTo(
        ["#copy-3"],
        0.8,
        {
          transformPerspective: 400,
          autoAlpha: 0,
          x: "-25",
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeInOut,
        },
        {
          transformPerspective: 400,
          autoAlpha: 1,
          x: 0,
        }
      )

      .fromTo(
        ["#copy-4"],
        0.8,
        {
          transformPerspective: 400,
          autoAlpha: 0,
          x: "-25",
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeInOut,
        },
        {
          transformPerspective: 400,
          autoAlpha: 1,
          x: 0,
        },
        "+=0"
      );
  };

  // function traceTime(){
  // 	console.log("slideTime: " + timeline.time());
  // }

  // nameSpace.hideBg = function () {
  //   TweenMax.to('#bg', 0, { autoAlpha: 0 });
  // };

  function startBgImg() {
    console.log("start bg image");
    var tl = new TimelineMax();

    tl.fromTo(
      ["#athena"],
      8,
      {
        transformPerspective: 400,
        autoAlpha: 0.15,
        scale: 0.7,
        transformOrigin: "80% 80%",
        force3D: true,
        rotationZ: 0.01,
        ease: Linear,
      },
      {
        transformPerspective: 400,
        autoAlpha: 1,
        scale: 1,
      },
      "-=1.25"
    )

      .to(
        ["#bg-color, #logo"],
        0.4,
        {
          transformPerspective: 400,
          autoAlpha: 1,
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeOut,
        },
        "-=0.4"
      )
      .to(
        ["#logo-blue"],
        1,
        {
          transformPerspective: 400,
          autoAlpha: 0,
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeOut,
        },
        "-=1"
      )
      .to(
        ["#athena"],
        0.2,
        {
          transformPerspective: 400,
          autoAlpha: 0.13,
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeOut,
        },
        "-=0.4"
      )

      .fromTo(
        ["#cta"],
        0.5,
        { scale: 1.05, transformOrigin: "25% 80%" },
        {
          scale: 1,
          transformPerspective: 400,
          autoAlpha: 1,
          force3D: true,
          rotationZ: 0.01,
          ease: Power2.easeInOut,
        },
        "+=1.5"
      )

      .to(
        ["#btn_disclosure"],
        1,
        {
          transformPerspective: 400,
          autoAlpha: 1,
          force3D: true,
          rotationZ: 0.01,
          ease: Linear.easeNone,
        },
        "+=0.8"
      )

      .to(["#cta"], 0.3, {
        scale: 1.05,
        transformPerspective: 400,
        transformOrigin: "35% 70%",
        autoAlpha: 1,
        force3D: true,
        rotationZ: 0.01,
        ease: Power2.easeInOut,
      })
      .to(["#cta"], 0.3, {
        scale: 1,
        transformPerspective: 400,
        transformOrigin: "35% 70%",
        autoAlpha: 1,
        force3D: true,
        rotationZ: 0.01,
        ease: Power2.easeInOut,
      })
      .to(
        ["#cta"],
        0.3,
        {
          scale: 1.05,
          transformPerspective: 400,
          transformOrigin: "35% 70%",
          autoAlpha: 1,
          force3D: true,
          rotationZ: 0.01,
          ease: Power2.easeInOut,
        },
        "+=0.5"
      )
      .to(["#cta"], 0.3, {
        scale: 1,
        transformPerspective: 400,
        transformOrigin: "25% 70%",
        autoAlpha: 1,
        force3D: true,
        rotationZ: 0.01,
        ease: Power2.easeInOut,
      });
  }

  nameSpace.startAnimation = function () {
    // Code for animation
    timeline.play();
    startBgImg();
    // TweenMax.delayedCall(	7.5, loop);
  };

  nameSpace.onAnimationComplete = function () {
    // Log duration of timeline
    console.log("Animation Duration: " + timeline.time() + "s");
    // Show a CTA or any animations outside main timeline
    // TweenMax.from( cta, 0.4, { y: '110%' } );
    // TweenMax.to( cta, 0.4, { opacity: 1 } );
  };
})();

var count = 1;

function loop() {
  if (count < 2) {
    console.log(count);
    count++;
    O2KL.init();
  }
}
//
