const express = require("express");
const app = express();
const port = 3000;
const connect = require("./schemas");
const usersRouter = require("./routes/users.route");//내가한거
const cookieParser = require("cookie-parser");
const {
  commentRouter,
  postRouter,
  usersRouter,
  userInfosRouter,
  authRouter,
} = require("./routes");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", [
  postRouter,
  commentRouter,
  usersRouter,//내가한거
  authRouter,//
  userInfosRouter,
]);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
