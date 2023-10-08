const scroll_anim = document.querySelectorAll(".animation");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-animation");
      } else {
        entry.target.classList.remove("scroll-animation");
      }
    });
  },
  { threshold: 0.5 }
);
for (let i = 0; i < scroll_anim.length; i++) {
  const elements = scroll_anim[i];
  observer.observe(elements);
}

let trail = document.querySelector(".trail");
let firstMove = true;
let timeout;

function addScript(src) {
  let script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
}

setTimeout(() => {
  let bartender = document.querySelector(".bartender");
  if (bartender) {
    addScript(
      window.location.protocol +
        "//" +
        window.location.host +
        "/widget/script.js"
    );
    bartender.remove();
  }
}, 900);

let scene = document.getElementById("landingParallax");

if (scene) {
  let parallaxInstance = new Parallax(scene);
}

if (trail) {
  window.addEventListener("mousemove", (e) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (firstMove) {
      trail.animate([{ opacity: 1, width: "200px", height: "200px" }], {
        duration: 5000,
        fill: "forwards",
      });
      trail.style.left = e.clientX - 100 + "px";
      trail.style.top = e.clientY - 100 + "px";
      firstMove = false;
      return;
    }
    trail.animate(
      [
        {
          left: e.clientX - 100 + "px",
          top: e.clientY - 100 + "px",
          width: "200px",
          height: "200px",
          opacity: 1,
        },
      ],
      {
        duration: 2000,
        fill: "forwards",
      }
    );
    timeout = setTimeout(() => {
      trail.animate([{ opacity: 0, width: "0px", height: "0px" }], {
        duration: 2000,
        fill: "forwards",
      });
    }, 1000);
  });

  document.addEventListener("mouseleave", (event) => {
    if (
      event.clientY <= 0 ||
      event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight
    ) {
      trail.animate([{ opacity: 0, width: "0px", height: "0px" }], {
        duration: 2000,
        fill: "forwards",
      });
    }
  });
}
