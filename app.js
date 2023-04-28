const wrapper = document.querySelector(".wrapper");
console.log(wrapper);

const virtualKeyboard = {
  elements: {
    keyboard: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capsLock: false,
  },

  init() {
    // create elements
    this.elements.keyboard = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.keyboard.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keyboard.appendChild(this.elements.keysContainer);
    wrapper.appendChild(this.elements.keyboard);
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "CapsLock",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "close",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      console.log(keyLayout);
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key-wide");
          keyElement.innerHTML = ("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "CapsLock":
          keyElement.classList.add(
            "keyboard__key-wide",
            "keyboard__key-activable"
          );
          keyElement.innerHTML = ("CapsLock");
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key-active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key-wide");
          keyElement.innerHTML = ("enter");
          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key-extra-wide");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "close":
          keyElement.classList.add(
            "keyboard__key-wide",
            "keyboard__key-inactive"
          );
          keyElement.innerHTML = ("close");
          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _toggleCapsLook() {
    console.log(CapsLock);
  },

  _triggerEvent(handlerName) {
    console.log(handlerName);
  },

  open(initialValue, oninput, onclose) {
    this.elements.keyboard.classList.remove("keyboard-hidden");
  },

  close() {
    this.elements.keyboard.classList.add("keyboard-hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  virtualKeyboard.init();
});
