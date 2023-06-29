const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { UserInfos, Users } = require("../models");
//암호화
const CryptoJS = require("crypto-js");
//.env파일에서 관리
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

//프로필 보기
router.get("/profile", authMiddleware, async (req, res) => {
  const { id } = res.locals.user;
  console.log("아이디입니다:" + id);
  try {
    const user = await Users.findOne({
      where: { id },
      attributes: ["email", "createdAt", "updatedAt"],
      include: [
        {
          model: UserInfos,
          attributes: ["nickname", "age", "gender", "introduce"],
        },
      ],
    });
    return res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: "불러오기에 실패하였습니다." });
  }
});
//프로필 수정
router.put("/profile", authMiddleware, async (req, res) => {
  const { email, password, nickname, age, gender, introduce } = req.body;
  const { id } = res.locals.user;

  // try {
  //만약 비밀번호가 같다면 업데이트
  //   const user = await Users.findOne({ where: { id } });
  //   const bytes = CryptoJS.AES.decrypt(user.password, PRIVATE_KEY);
  //   const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //   if (decrypted === password) {
  //     await Users.update({ email, password }, { where: { id } });
  //     await UserInfos.update(
  //       { nickname, age, gender, introduce },
  //       { where: { userId: id } }
  //     );
  //     return res.status(200).json({ message: "정보를  수정하였습니다." });
  //   }
  // } catch (err) {
  //   console.lor(err);
  //   return res.status(400).json({ errorMessage: "수정에 실패하였습니다." });
  // }
});

module.exports = router;
