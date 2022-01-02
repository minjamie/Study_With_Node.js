const os = require("os");

console.log("cpu 정보--------------------------------------");
console.log("os.cpus():", os.cpus());
// 코어 갯수
console.log("os.cpus().length:", os.cpus().length);
console.log("메모리 정보-----------------------------------");
console.log("os.freemem():", os.freemem());
console.log("os.totalmem():", os.totalmem());
// os.constants라는 객체 안에는 각종 에러와 신호에 대한 정보가 담겨 있습니다.
// 에러가 발생했을 때, EADDRINUSE나 ECONNRESET 같은 에러 코드를 함께 보여줍니다.
// 이러한 코드들이 os.constants 안에 들어 있습니다.
