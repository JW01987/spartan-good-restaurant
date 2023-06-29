const express = require("express");
const router = express.Router();
const { Users, UserInfos } = require("../models");
const { emailCheck, passwordCheck } = require("./js/validationCheck");
//암호화 라이브러리
const CryptoJS = require("crypto-js");
const PRIVATE_KEY = "secret key";

// 회원가입
router.post("/users", async (req, res) => {
  const { email, password, nickname, age, gender, introduce } = req.body;
  if (!emailCheck(email) || !passwordCheck(password)) {
    console.log(email, password);
    return res
      .status(401)
      .json({ errorMessage: "유효하지 않은 이메일 혹은 비밀번호입니다" });
  }
  const isExistUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  // email과 동일한 유저가 실제로 존재할 때 에러 발생
  if (isExistUser) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }

  // 비밀번호 암호화//
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(password),
    PRIVATE_KEY
  ).toString();
  try {
    const user = await Users.create({ email, password: encrypted });
    await UserInfos.create({
      userId: user.id,
      nickname,
      age,
      gender,
      introduce,
    });
    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "회원가입에 실패했습니다." });
  }
});

module.exports = router;
