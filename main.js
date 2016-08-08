(function () {

  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var pickRandomWord = function (string) {
    var words = string.split(' ');
    var randomWord = random(0, words.length);
    return words[randomWord];
  };

  var removeUnnecessaryCapitalization = function (string) {
    return string.toLocaleLowerCase();
  };

  var removeUnnecessaryStuff = function (string) {
    return string.replace(/\r\n|\r|\n|,|:/g, '');
  };

  var uppercaseRandomWords = function (string) {
    var words = string.split(' ');
    var randomWordAmount = Math.floor(words.length / random(3, 15));

    for (var i = 0; i < randomWordAmount; i++) {
      var randomWord = pickRandomWord(string);
      string = string.replace(randomWord, randomWord.toLocaleUpperCase());
    }
    return string;
  };

  var extendPunctuation = function (string) {
    return string.replace(/\./g, function(match) {
      var coin = random(0,1);
      if (coin) {
        var replacement = Array(random(3,8) + 1).join('!');
      } else {
        var replacement = Array(random(2,6) + 1).join('.');;
      }
      return replacement
    }).replace(/\?/g, function() { return Array(random(3,8) + 1).join('?') });
  };

  var improveSpelling = function (string) {
    for (var i = 0; i < 3; i++) {
      var randomWord = pickRandomWord(string);
      string = string.replace(randomWord, function(match) {
        var letters = match.split('');
        var r1 = random(0, letters.length);
        var r2 = r1 === 0 ? r1 + 1 : r1 - 1;
        var t1 = letters[r1];
        var t2 = letters[r2];
        letters[r1] = t2;
        letters[r2] = t1;
        return letters.join('');
      });
    }
    return string;
  };

  var schweigr = function(input) {
    return extendPunctuation(improveSpelling(uppercaseRandomWords(removeUnnecessaryCapitalization(removeUnnecessaryStuff(input + '!11!!!')))));
  };

  var input = document.querySelector('.js-input');
  var button = document.querySelector('.js-action');
  var output = document.querySelector('.js-output');

  button.addEventListener('click', function (e) {
    e.preventDefault();
    var text = input.value;
    output.innerHTML = schweigr(text);
    document.body.classList.add('schweigrized');
  })

})();
