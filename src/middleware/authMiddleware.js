const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "인증이 필요합니다. JWT 토큰을 포함해주세요." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "mysecret", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
    req.user = decoded; // ✅ JWT에서 추출한 유저 정보 저장
    next();
  });
};

module.exports = authenticateJWT;
