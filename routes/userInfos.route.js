const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { UserInfos, Users } = require('../models');
const { passwordCheck, emailCheck } = require('./js/validationCheck.js');
//암호화
const CryptoJS = require('crypto-js');
//.env파일에서 관리
require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

//프로필 보기
router.get('/profile', authMiddleware, async (req, res) => {
  const { id } = res.locals.user;
  console.log('아이디입니다:' + id);
  try {
    const user = await Users.findOne({
      where: { id },
      attributes: ['email', 'createdAt', 'updatedAt'],
      include: [
        {
          model: UserInfos,
          attributes: ['nickname', 'age', 'gender', 'introduce'],
        },
      ],
    });
    return res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: '불러오기에 실패하였습니다.' });
  }
});

//프로필 수정
router.put('/profile', authMiddleware, async (req, res) => {
  const { email, password, confirmPassword, nickname, age, gender, introduce } =
    req.body;
  const { id } = res.locals.user;

  try {
    if (email) {
      console.log(1, email);
      if (!emailCheck(email)) {
        return res
          .status(400)
          .json({ errorMessage: '유효하지 않은 이메일입니다.' });
      }
      console.log(2, email);
      await Users.update({ email }, { where: { id } });
      console.log(3, email);
    }

    if (password && confirmPassword) {
      if (!passwordCheck(password)) {
        return res
          .status(400)
          .json({ errorMessage: '유효하지 않은 비밀번호입니다.' });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
      }

      const user = await Users.findOne({ where: { id } });
      const bytes = CryptoJS.AES.decrypt(user.password, PRIVATE_KEY);
      const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (decrypted === password) {
        return res
          .status(400)
          .json({ errorMessage: '기존 비밀번호와 동일한 비밀번호입니다.' });
      }

      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(password),
        PRIVATE_KEY
      ).toString();
      await Users.update({ password: encrypted }, { where: { id } });
    }

    if (nickname || age || gender || introduce) {
      await UserInfos.update(
        { nickname, age, gender, introduce },
        { where: { userId: id } }
      );
    }

    return res.status(200).json({ message: '정보를 수정하였습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: '수정에 실패하였습니다.' });
  }
});

module.exports = router;
