const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const {
  commentRouter,
  postRouter,
  usersRouter,
  userInfosRouter,
  // authRouter,
} = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", [postRouter, commentRouter, usersRouter]);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
