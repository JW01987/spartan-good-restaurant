const jwt = require("jsonwebtoken"); //사용자 인증미들웨어
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // 사용자 인증
    const { authorization } = req.cookies;
    const [tokenType, token] = authorization.split(" ");
    if (tokenType !== "Bearer" || !token) {
      return res
        .status(401)
        .json({ message: "토큰 타입이 일치하지 않습니다." });
    }

    const decodedToken = jwt.verify(token, "customized_secret_key");
    const userId = decodedToken.id;

    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      //res.clearCookie("authorization");
      return res
        .status(401)
        .json({ message: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "비정상적인 요청입니다.",
    });
  }
};
