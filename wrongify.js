'use strict';
const fs =  require('fs');
const readline = require('readline');

const vowels = 'aeiou';
const dictionaryPath = process.env.SC_DICT_PATH || '/usr/share/dict/words';

//read dictionary into array and start generating mistakes once done.
function init() {
  var dictArray = [];
  var file = fs.createReadStream(dictionaryPath);
  const fileStream = readline.createInterface({input: file});

  fileStream.on('line', (line) => {
    dictArray.push(line);
  });

  fileStream.on('close', () => {
    makeMistakes(dictArray);
  });
}

function makeMistakes(arr) {
  console.log(wrongify(arr[Math.floor(Math.random() * arr.length)]));
  setTimeout(function() {
    makeMistakes(arr);
  }, 1000);
}

function shouldMistake() {
  return Math.random() >= 0.5;
}

//go through the input string, making mistakes correctable by spell checker.
function wrongify(str) {
  var chars = str.split('');
  var repeating = false;
  for (var i=0; i < chars.length; i++) {
    //maybe replace a vowel with another
    if (!repeating && shouldMistake() && vowels.indexOf(chars[i]) > -1) {
      chars[i] = vowels[Math.floor(Math.random() * 5)];
    }
    //maybe repeat the current character
    if (shouldMistake()) {
      repeating = true;
      chars.splice(i + 1, 0, chars[i]);
    }
    else {
      repeating = false;
    }
    //maybe change the character's case
    if (shouldMistake()) {
      if (chars[i] == chars[i].toLowerCase()) {
        chars[i] = chars[i].toUpperCase();
      }
      else {
        chars[i] = chars[i].toLowerCase();
      }
    }
  }
  return chars.join('');
}

init();
