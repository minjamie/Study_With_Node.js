const { odd, even } = require("/var");
function checkOddOrEven(num) {
  if (num % 2) {
    // 홀수면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;
// 만약 함수를 넣는 경우엔  module.exports !== exports이다
// 가장 좋은 사용 방식, 1가지만 넣고 싶을 땐 module.exports로

// 여러개를 넣고 싶을 땐 module.exports = { odd, even,};
// 혹은 exports.odd  = odd; exports.evne = evne
// 이렇게 하면 참조관계가 계속 유지된다.
