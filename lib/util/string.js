module.exports = function () {
  String.prototype.capitalizeWords = function () {
    var words = this.split(' ');
    words.forEach(function (word, index, words) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      words[index] = word;
    });

    return words.join(' ');
  };
};
