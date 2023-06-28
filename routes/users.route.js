const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const { Users, UserInfos } = require("../models"); 

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

  // // 사용자 테이블에 데이터삽입
  // const user = await Users.create({ email, password });
  // // 사용자 정보 테이블에 데이터 삽입
  // await UserInfos.create({
  //   UserId: user.userId, //현재 사용자 정보가 19번째 줄에서 생성된 사용자의 userId를 할당합니다
  //   nickname,
  //   age,
  //   gender,
  //   introduce,
  // });

// 비밀번호 암호화
const hashedPassword = crypto  // hash 함수를 일반 텍스트 암호로 갱신
  createHash("sha256") //createHash메서드를 사용하여 암호화 해시함수만듬 //해싱 알고리즘을 sha로 지정  
  update(password)
  digest("hex");// 해시된 암호를 16진수 형식으로 생성

const user = await Users.create({ email, password: hashedPassword });
await UserInfos.create({
  UserId: user.usersId,
  nickname,
  age,
  gender,
  introduce,
});  

  return res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

module.exports = router;