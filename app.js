const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const {
  commentRouter,
  postRouter,
  usersRouter,
  userInfoRouter,
  authRouter,
} = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', [
  postRouter,
  commentRouter,
  usersRouter,
  authRouter,
  userInfoRouter,
]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
