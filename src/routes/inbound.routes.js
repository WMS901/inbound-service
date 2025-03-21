const express = require('express');
const router = express.Router();
const InboundController = require('../controller/inbound.controller');
const authenticateJWT = require("../middleware/authMiddleware"); // ✅ JWT 인증 미들웨어

const inboundController = new InboundController();

// ✅ JWT 인증이 필요한 API
router.post('/', authenticateJWT, inboundController.createInboundItem);
router.put('/:sku', authenticateJWT, inboundController.updateInboundItem);
router.delete('/:sku', authenticateJWT, inboundController.deleteInboundItem);

// ✅ 인증 없이 접근 가능한 API
router.get('/', inboundController.getAllInboundItems);
router.get('/:sku', inboundController.getInboundItemBySku);
router.put('/:sku/confirm', inboundController.confirmInbound); // Kafka 연동 → 인증 제거 유지

module.exports = router;
