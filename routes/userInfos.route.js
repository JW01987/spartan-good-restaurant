const express = require("express");
const router = express.Router();
//const authMiddleware = require("");
const { UsersInfos } = require("../models");

//프로필 보기
router.get("/profile", async (req, res) => {
  const { userId } = res.locals.user;
  try {
    const user = await UsersInfos.findOne({
      attributes: ["introduce", "nickname"],
      where: { userId },
    });
    return res.status(201).json({ data: user });
  } catch {
    return res.status(400).json({ errorMessage: "불러오기에 실패하였습니다." });
  }
});
//프로필 수정
router.put("/profile", async (req, res) => {
  const { nickname, introduce, password } = req.body;
  const { userId } = res.locals.user;
  try {
    const user = await UsersInfos.findOne({ where: { userId } });

    if (nickname) {
      user.nickname = nickname;
    }
    if (introduce) {
      user.introduce = introduce;
    }
    if (password) {
      user.password = password;
    }

    await user.save();

    return res.status(200).json({ message: "정보를  수정하였습니다." });
  } catch {
    return res.status(400).json({ errorMessage: "수정에 실패하였습니다." });
  }
});
module.exports = router;
