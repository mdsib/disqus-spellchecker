const fs =  require('fs');
const readline = require('readline');

const vowels = 'aeiou';


function init() {
  var dictArray = [];
  var file = fs.createReadStream('/usr/share/dict/words');
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

function wrongify(str) {
  var chars = str.split('');
  var repeating = false;
  for (var i=0; i < chars.length; i++) {
    if (!repeating && shouldMistake() && vowels.indexOf(chars[i]) > -1) {
      chars[i] = vowels[Math.floor(Math.random() * 5)];
    }
    if (shouldMistake()) {
      repeating = true;
      chars.splice(i + 1, 0, chars[i]);
    }
    else {
      repeating = false;
    }
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
