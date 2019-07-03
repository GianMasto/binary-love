function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var dictionary = [
  ",",
  "?",
  " ",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "❤",
  "te amo"
];
var codeButton = document.getElementById("code");
var decodeButton = document.getElementById("decode"); // const copyButton = document.getElementById("copy");

var render = function render(text) {
  var div = document.getElementById("text-result");

  if (!(text === "error")) {
    div.innerHTML = text;
  } else {
    div.innerHTML = "Error";
  }
}; // copyButton.addEventListener("click", e => {
//   e.preventDefault();
//   const result = document.getElementById("text-result").innerHTML;
//   if (result) {
//     result.select();
//     document.execCommand("copy");
//   }
// });

codeButton.addEventListener("click", function(e) {
  e.preventDefault();
  var decimalArray = document
    .getElementById("text")
    .value.toLowerCase()
    .replace(/te amo/g, "$")
    .split("")
    .map(function(char) {
      if (char === "$") {
        return dictionary.indexOf("te amo");
      }

      return dictionary.indexOf(char);
    });
  var binaryArray = decimalArray.map(function(num) {
    return num.toString(2);
  }); // Set the length of all array to 5, adding 0s to the end if necessary

  binaryArray.forEach(function(num, index) {
    tempNum = num;

    while (tempNum.length < 5) {
      tempNum = "0" + tempNum;
    }

    binaryArray[index] = tempNum;
  });
  var heartedArray = binaryArray
    .join("")
    .split("")
    .map(function(num) {
      if (num === "0") {
        return "💛";
      } else if (num === "1") {
        return "❤";
      } else {
        throw render("error");
      }
    })
    .join("");
  render(heartedArray);
});
decodeButton.addEventListener("click", function(e) {
  e.preventDefault();
  var text = document.getElementById("text").value;

  var arrText = _toConsumableArray(text)
    .map(function(char) {
      if (char === "💛") {
        return 0;
      } else if (char === "❤") {
        return 1;
      } else {
        throw render("error");
      }
    })
    .join("");

  var binaryArr;

  if (!(arrText.length % 5 === 0)) {
    throw render("error");
  } else {
    binaryArr = arrText.match(/.{1,5}/g);
  }

  decimalArr = binaryArr.map(function(num) {
    return parseInt(num, 2);
  });
  decodedText = decimalArr
    .map(function(num) {
      return dictionary[num];
    })
    .join("");
  render(decodedText);
});
