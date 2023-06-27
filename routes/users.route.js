const express = require("express");
const jwt = require("jsonwebtoken"); //
const router = express.Router();
const { Users, UserInfos } = require("../models"); //새로적은코드
//밑에 코드 확인필요
//const User = require("../schemas/user");//어떤코드를 넣어야하는가

//회원가입//
router.post("/users", async (req, res) => {
  const { email, password, nickname, age, gender, introduce } = req.body;
  const isExistUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  //email 과 동일한 유저가 실제로 존재할때 에러발생
  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }

  // 사용자 테이블에 데이터삽입
  const user = await Users.create({ email, password });
  // 사용자 정보 테이블에 데이터 삽입
  await UserInfos.create({
    UserId: user.userId, //현재 사용자 정보가 19번째 줄에서 생성된 사용자의 userId를 할당합니다
    nickname,
    age,
    gender,
    introduce,
  });

  return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

// 로그인//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { email },
  });
  //해당사용자 존재,비번존재
  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
  } else if (user.password !== password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  //jwt를 생성
  const token = jwt.sign(
    {
      userId: user.userId,
    },
    "customized_secret_key"
  );
  //쿠키를발급
  res.cookie("authorization", `Bearer ${token}`);
  //response 할당
  return res.status(200).json({ message: "로그인 성공" });
});

//사용자 조회 API
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await Users.findOne({
    attributes: ["userId", "email", "createdAt", "updatedAt"],
    include: [
      {
        model: UserInfos,
        attributes: ["nickname", "age", "gender", "introduce"],
      },
    ],
  });

  return res.status(200).json({ data: user });
});

module.exports = router;
