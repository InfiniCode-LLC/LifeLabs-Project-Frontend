let scene = document.getElementById("landingParallax");
let parallaxInstance = new Parallax(scene);

let trail = document.querySelector(".trail");
let firstMove = true;
let timeout;
trail.style.left;

window.addEventListener("mousemove", (e) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  if (firstMove) {
    trail.animate([{ opacity: 1, width: "200px", height: "200px" }], {
      duration: 5000,
      fill: "forwards",
    });
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";
    firstMove = false;
    return;
  }
  trail.animate(
    [
      {
        left: e.clientX + "px",
        top: e.clientY + "px",
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

document.addEventListener("mouseleave", function (event) {
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
