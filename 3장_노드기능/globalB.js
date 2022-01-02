const A = require("./globalA");

global.message = "안녕하세요";
console.log(A());
// 콘솔 결과는 globalB에서 넣은 global.message 값을 globalA에서도 접근할 수 있다.
