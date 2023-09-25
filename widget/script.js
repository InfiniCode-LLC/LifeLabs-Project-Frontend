(() => {
  let popupWindow;
  let isClosing = false;
  let cssId = "daisyWidget";
  let windowOpen = false;
  if (!document.getElementById(cssId)) {
    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href =
      window.location.protocol +
      "//" +
      window.location.host +
      "/widget/style.css";
    link.media = "all";
    head.appendChild(link);
  }

  function DaisyWidget() {
    let button = document.createElement("button");
    document.body.style.overflow = "hidden";
    button.id = "daisy-btn";
    button.classList.add("unloaded");
    button.onclick = DaisyChat;

    let image = document.createElement("img");
    image.src =
      window.location.protocol +
      "//" +
      window.location.host +
      "/widget/chat.png";
    image.style.width = "100%";
    image.style.height = "100%";
    image.draggable = false;
    image.onload = () => {
      button.appendChild(image);
      document.body.appendChild(button);
      setTimeout(() => {
        button.classList.remove("unloaded");
        setTimeout(() => {
          document.body.style.overflowY = "scroll";
        }, 200);
      }, 100);
    };
  }

  function DaisyChat() {
    if (windowOpen && popupWindow) {
      if (isClosing) return;
      isClosing = true;
      popupWindow.classList.add("unloaded");
      setTimeout(function () {
        popupWindow.style.display = "none";
        document.body.removeChild(popupWindow);
        windowOpen = false;
      }, 500);
      isClosing = false;
      return;
    }
    popupWindow = document.createElement("div");
    popupWindow.id = "daisy-chat";
    popupWindow.classList.add("unloaded");

    var closeButton = document.createElement("button");
    closeButton.id = "daisy-close";
    closeButton.innerHTML = "&times;";

    closeButton.addEventListener("click", function () {
      popupWindow.classList.add("unloaded");
      setTimeout(function () {
        popupWindow.style.display = "none";
        document.body.removeChild(popupWindow);
        windowOpen = false;
      }, 500);
    });

    popupWindow.appendChild(closeButton);

    var chatIframe = document.createElement("iframe");
    chatIframe.src =
      window.location.protocol +
      "//" +
      window.location.host +
      "/widget/index.html";
    chatIframe.style.width = "100%";
    chatIframe.style.height = "100%";
    chatIframe.style.border = "none";

    popupWindow.appendChild(chatIframe);
    document.body.appendChild(popupWindow);
    windowOpen = true;
    chatIframe.onload = () => {
      popupWindow.classList.remove("unloaded");
    };
  }

  DaisyWidget();
})();
