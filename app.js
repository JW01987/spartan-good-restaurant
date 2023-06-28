const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const {
  commentRouter,
  postRouter,
  usersRouter,
  userInfoRouter,
  userInfoRouter,
  authRouter,
} = require("./routes");

app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("assets")); //정적파일 사용하기 위해, assets의 html, css, js, 이미지 등
app.use("/api", [
  postRouter,
  commentRouter,
  usersRouter,
  userInfoRouter,
  authRouter,
]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
