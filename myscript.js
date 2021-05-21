import adjectives from "./rlp-adj.js";
import animals from "./rlp-animals.js";

function randomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLocaleLowerCase())
    .join(" ");
};

function transition(n, divId, words) {
  var array = location.hash
    ? words.filter((w) => w.startsWith(location.hash.substr(1, 1)))
    : words;

  setTimeout(() => {
    document.getElementById(divId).innerHTML = capitalize(randomWord(array));
  }, n);
}

function spin() {
  const ph = document.getElementById("placeholder");
  if (ph) ph.remove();

  for (var i = 1000; i > 0; i -= Math.random() * 50) {
    transition(i, "adj", adjectives);
    transition(i, "animal", animals);
  }

  setTimeout(() => {
    document.getElementById("cpy-icon").className = "";
  }, 1000);
}

document.getElementById("btn").onclick = spin;

document.getElementById("cpy-btn").onclick = function () {
  const el = document.createElement("textarea");
  el.value =
    document.getElementById("adj").innerText +
    " " +
    document.getElementById("animal").innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  document.execCommand("copy");

  const btn = document.getElementById("cpy-icon");
  btn.src = "static/images/check.svg";
  setTimeout(() => {
    btn.src = "static/images/copy.svg";
  }, 1000);
};

document.onkeypress = function (ev) {
  if (ev.key.match(/^[a-z]$/i)) {
    location.hash = ev.key.toLocaleUpperCase();
  } else if (ev.key === " " || ev.key === "Enter") {
    spin();
  }
};
