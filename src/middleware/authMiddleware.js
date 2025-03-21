const authenticateJWT = (req, res, next) => {
    const kongConsumer = req.headers["x-consumer-username"]; // Kong이 인증한 사용자 정보

    if (!kongConsumer) {
        return res.status(401).json({ message: "Kong 인증 실패: JWT 없음" });
    }

    console.log("✅ Kong 인증 완료:", kongConsumer);
    req.user = { username: kongConsumer }; // 요청 객체에 사용자 정보 저장
    next();
};
