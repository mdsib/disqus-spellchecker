'use strict';
const fs =  require('fs');
const readline = require('readline');
const Levenshtein = require('levenshtein');

const repeatedCharacters = /(.)(?=\1)/g;
const vowels = /[aeiou]+/g;
const dictionaryPath = '/usr/share/dict/words'
const negativeResultStr = 'NO CORRECTION';

var dict = {};

//Loads dictionary and triggers prompt.
function init(path) {
  console.log("Loading dictionary...")
  var file = fs.createReadStream(path || dictionaryPath);
  var fileStream = readline.createInterface({input: file});

  fileStream.on('line', (line) => {
    addStrToDict(line);
  });

  fileStream.on('close', () => {
    console.log("Dictionary loaded.")
    initRead();
  });
}

//Initializes reading from stdin.
function initRead() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.prompt();

  rl.on('line', (line) => {
    findCorrection(line);
    rl.prompt();
  });
}

//places entry into object at formatted key
function addStrToDict(str) {
  var key = str.toLowerCase().replace(repeatedCharacters, "").replace(vowels, 'V');
  if (dict[key]) {
    dict[key].push(str);
  }
  else {
    dict[key] = [str];
  }
}

//attempts to correct incoming string by accessing dictionary and comparing
//potential results with levenshtein distances
function findCorrection(str) {
  var dupesRemovedString = str.toLowerCase().replace(repeatedCharacters, "")
  var key = dupesRemovedString.replace(vowels, 'V');
  var results = dict[key] || [];

  if (results.indexOf(str) > -1) {
    //word defined, no correction necessary
    console.log(negativeResultStr);
  }
  else {
    var correction = {};
    for (var result of results) {
      //find closest string that only removes repeating chars
      var lvd = new Levenshtein(str, result).distance;
      if ((!correction.lvd || lvd < correction.lvd) &&
           dupesRemovedString.length <= result.length) {
        correction = {
          str: result,
          lvd: new Levenshtein(str, result).distance
        };
      }
    }
    console.log(correction.str || negativeResultStr);
  }
}

init();
