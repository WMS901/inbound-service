const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("📌 요청 헤더:", req.headers); // ✅ JWT 포함 여부 확인

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("🚨 JWT 없음 또는 형식 오류");
        return res.status(401).json({ message: "인증이 필요합니다. JWT 토큰을 포함해주세요." });
    }

    const token = authHeader.split(" ")[1];
    console.log("📌 받은 JWT 토큰:", token);

    jwt.verify(token, "your-super-secret-key-that-is-very-long", (err, decoded) => { // ✅ Kong의 `secret`과 일치해야 함
        if (err) {
            console.log("🚨 JWT 검증 실패:", err.message);
            return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
        }

        console.log("✅ JWT 검증 성공:", decoded);
        req.user = decoded;
        next();
    });
};

module.exports = authenticateJWT;
