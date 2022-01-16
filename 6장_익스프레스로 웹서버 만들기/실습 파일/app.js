const dotenv = require("dotenv");

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
dotenv.config();
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.set("port", process.env.PORT || 3000);
// 서버에 속성 심는 것, 포트 속성 3000을 넣어서 설정

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키를 서명화하는 것
app.use(express.json());
app.use(
  session({
    resave: false,
    // 요청왔을 때 세션 수정 사항 생기지 않아도 저장할지 여부
    saveUninitialized: false,
    // 세션에 저장할 내역 없더라도 세션을 저장할지 여부
    secret: COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
    name: "connect.sid",
  })
);

const multer = require("multer");
const fs = require("fs");
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads폴더 생성");
  fs.mkdirSync("uploads");
}
const uploads = multer({
  // storage, limit옵션 두개
  // 업로드한 파일 어디에 저장할지 결정 - 디스크나 메모리 처럼
  storage: multer.diskStorage({
    // 어디에 저장할지
    destination(req, file, done) {
      // done은 첫번째 자리는 에러났을 때, 두번재 인수는 성공시
      done(null, "uploads/");
    },
    // 어떤이름으로 올릴지 확장자 추출
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // 파일사이즈나 갯수
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multerpart.html"));
});

// 한개의 파일만 업로드시 uploads.single 여러개일 땐  uploads.array uploads.fields({name, limits}) none은 이미지 업로드 안할 때
app.get("/upload", uploads.single("image"), (req, res) => {
  console.log(req.file);
  res.send("ok");
});

const { mainModule } = require("process");

app.use("/", (req, res, next) => {
  express.static(path.join(__dirname, "public"))(req, res, next);
});

// json은 클라에서 json데이터 보낼 시 파싱해서 req.body로 넣어주고
app.use(express.urlencoded({ extended: true }));
// urlencoded는 클라에서 f rm submit시 파싱해주는 것
// form 파싱 시 쿼리스트링을 어떻게 처리 true로 하면 qs모듈/false면 querystring

// 공통되는 코드를 빼줄 수 있다. 모든 라우터(메서드와 주소)에 요청을 보냄
app.use((req, res, next) => {
  req.data = "data";
  req.session.data = "data";
});

app.get(
  "/",
  (req, res, next) => {
    // res.send("hi express") - 단순 문자열로 응답;
    // HTML로 응답
    req.data;
    req.session.data;
    req.session;
    // req.body.name;
    req.cookies; // 알아서 쿠기를 키-값 형태로 받아서 파싱해줌
    req.signedCookies; // 서명된 쿠기
    res.cookie("name", encodeURIComponent(name), {
      expires: new Date(),
      httpOnly: true,
      path: "/",
    });
    // res.clearCookie() 쿠키 지울 때

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

app.use("/", indexRouter);
app.use("/user", userRouter);

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
