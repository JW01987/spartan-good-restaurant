const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken"); 
const { Users } = require("../models"); 

// 로그인//
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: { email },
  });
  //해당사용자 존재,비번존재
  if (!user) {
    return res
      .status(401)
      .json({ errorMessage: "존재하지 않는 이메일입니다." });
  } else if (user.password !== password) {
    return res
      .status(401)
      .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
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

//로그아웃 API
router.post("/logout", (req, res) => {
  //클라에서 해당경로로 요청을 보내면 서버는 쿠키의 authorization토큰을삭제
  // 클라이언트에서 토큰 삭제
  res.clearCookie("authorization"); //메서드를 사용하여 클라 쿠키 삭제

  return res.status(200).json({ message: "로그아웃되었습니다." }); //응답값
});

module.exports = router;
