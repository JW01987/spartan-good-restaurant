// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");//확인받기
// const User = require("../schemas/user");//확인받기
// //코드는 여기
// //로그인 API
// router.post("/auth", async (req, res) => {
//     const { email, password } = req.body;
//   //이메일이 일치하는 유저를찾는다
//     const user = await User.findOne({ email });
  
//     // NOTE: 인증 메세지는 자세히 설명하지 않는것을 원칙으로 한다.
//     if (!user || user.password !== password) {
//       res.status(400).json({
//         errorMessage: "로그인에 실패하였습니다.",
//       });
//       return;
//     }
//   //jwt를 생성
//     const token = jwt.sign({userId: user.userId},"customized-secret-key",);
  
//       res.cookie("Authorization", `Bearer ${token}`); // JWT를 Cookie로 할당합니다!
//     res.status(200).json({token}); // JWT를 Body로 할당합니다!
//   });
  
// module.exports = router;
