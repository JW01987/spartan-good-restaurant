const express = require('express');
const router = express.Router();
const { Users, UserInfos } = require('../models'); //새로적은코드

// 회원가입
router.post('/users', async (req, res) => {
  const { email, password, nickname, age, gender, introduce } = req.body;
  const isExistUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  // email과 동일한 유저가 실제로 존재할 때 에러 발생
  if (isExistUser) {
    return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
  }

  // 사용자 테이블에 데이터 삽입
  const user = await Users.create({ email, password });
  const userInfo = await UserInfos.create({
    userId: user.id, //현재 사용자 정보가 19번째 줄에서 생성된 사용자의 userId를 할당합니다
    nickname,
    age,
    gender,
    introduce,
  });

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
});

module.exports = router;
