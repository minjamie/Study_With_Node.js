const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);
// 서버에 속성 심는 것, 포트 속성 3000을 넣어서 설정

app.get("/", (req, res) => {
  // res.send("hi express") - 단순 문자열로 응답;
  res.sendFile(path.join(__dirname, "index.html"));
  // HTML로 응답
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
