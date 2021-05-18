import adjectives from './rlp-adj.js'
import animals from './rlp-animals.js'

function randomWord(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLocaleLowerCase()
  }

function transition(n, divId, words) {
    var array = location.hash
        ? words.filter(w => w.startsWith(location.hash.substr(1, 1)))
        : words

    setTimeout(() => {
        document.getElementById(divId).innerHTML = capitalize(randomWord(array))
    }, n)
}

document.getElementById('btn').onclick = function () {
    for (var i = 1000; i > 0; i -= (Math.random() * 50)) {
        transition(i, 'adj', adjectives);
    }

    for (var i = 1000; i > 0; i -= (Math.random() * 50)) {
        transition(i, 'animal', animals);
    }
}
