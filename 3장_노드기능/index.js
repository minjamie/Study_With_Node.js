const { odd, even } = require("./var");
// 구조분해는 똑같이
const checkNumber = require("./func");
// 모듈 블러 올 때 변수명 변경가능
function checkStringOddOrEven(str) {
  if (str.length % 2) {
    // 홀수면
    return odd;
  }
  return even;
}
console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
