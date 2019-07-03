const dictionary = [
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

const codeButton = document.getElementById("code");
const decodeButton = document.getElementById("decode");
// const copyButton = document.getElementById("copy");

const render = text => {
  const div = document.getElementById("text-result");
  if (!(text === "error")) {
    div.innerHTML = text;
  } else {
    div.innerHTML = "Error";
  }
};

// copyButton.addEventListener("click", e => {
//   e.preventDefault();
//   const result = document.getElementById("text-result").innerHTML;

//   if (result) {
//     result.select();
//     document.execCommand("copy");
//   }
// });

codeButton.addEventListener("click", e => {
  e.preventDefault();
  const decimalArray = document
    .getElementById("text")
    .value.toLowerCase()
    .replace(/te amo/g, "$")
    .split("")
    .map(char => {
      if (char === "$") {
        return dictionary.indexOf("te amo");
      }

      return dictionary.indexOf(char);
    });

  const binaryArray = decimalArray.map(num => {
    return num.toString(2);
  });
  // Set the length of all array to 5, adding 0s to the end if necessary
  binaryArray.forEach((num, index) => {
    tempNum = num;
    while (tempNum.length < 5) {
      tempNum = "0" + tempNum;
    }
    binaryArray[index] = tempNum;
  });

  const heartedArray = binaryArray
    .join("")
    .split("")
    .map(num => {
      if (num === "0") {
        return "🧡";
      } else if (num === "1") {
        return "❤";
      } else {
        throw render("error");
      }
    })
    .join("");

  render(heartedArray);
});

decodeButton.addEventListener("click", e => {
  e.preventDefault();

  const text = document.getElementById("text").value;
  const arrText = [...text]
    .map(char => {
      if (char === "🧡") {
        return 0;
      } else if (char === "❤") {
        return 1;
      } else {
        throw render("error");
      }
    })
    .join("");

  let binaryArr;
  if (!(arrText.length % 5 === 0)) {
    throw render("error");
  } else {
    binaryArr = arrText.match(/.{1,5}/g);
  }

  decimalArr = binaryArr.map(num => {
    return parseInt(num, 2);
  });

  decodedText = decimalArr
    .map(num => {
      return dictionary[num];
    })
    .join("");

  render(decodedText);
});
