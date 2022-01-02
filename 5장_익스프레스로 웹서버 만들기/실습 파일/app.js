const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);
// 서버에 속성 심는 것, 포트 속성 3000을 넣어서 설정

// 공통되는 코드를 빼줄 수 있다. 모든 라우터(메서드와 주소)에 요청을 보냄
app.use(
  (req, res, next) => {
    console.log(" 1 모든 요청에 실행");
    next();
  }
  // (req, res, next) => {
  //   console.log("2 모든 요청에 실행");
  //   next();
  // },
  // (req, res, next) => {
  //   try {
  //     console.log(asdfasdf);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
);

app.get(
  "/",
  (req, res, next) => {
    // res.send("hi express") - 단순 문자열로 응답;
    // HTML로 응답
    res.sendFile(path.join(__dirname, "index.html"));
    if (true) {
      next("route");
    } else {
      next();
    }
  },
  (req, res) => {
    res.send(`false면 실행`);
  }
);

app.get("/", (req, res) => {
  res.send(`true면 실행!`);
});

app.post("/", (req, res) => {
  res.send("Hello express");
});

app.get("/category/:name", (req, res) => {
  res.send(`hi ${req.params.name}`);
});

// app.get("*", (req, res) => {
//   res.send(`hi ${req.params.name}`);
// });

app.get("/about", (req, res) => {
  res.send("Hi express");
});

app.use((req, res, next) => {
  res.status(404).send("404");
});

// 에러 처리 미들웨어로 모든 에러를 처리해준다.
app.use((err, req, res, next) => {
  console.error(err);
  res.send("error happen");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
