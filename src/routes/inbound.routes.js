const express = require('express');
const router = express.Router();
const InboundController = require('../controller/inbound.controller');
const authenticateJWT = require("../middleware/authMiddleware"); // JWT 인증 미들웨어 추가

const inboundController = new InboundController();

// ✅ this 컨텍스트 고정 (bind 사용)
router.post('/', authenticateJWT, inboundController.createInboundItem.bind(inboundController));
router.put('/:sku', authenticateJWT, inboundController.updateInboundItem.bind(inboundController));
router.delete('/:sku', authenticateJWT, inboundController.deleteInboundItem.bind(inboundController));

router.get('/', inboundController.getAllInboundItems.bind(inboundController));
router.get('/:sku', inboundController.getInboundItemBySku.bind(inboundController));
router.put('/:sku/confirm', inboundController.confirmInbound.bind(inboundController));

module.exports = router;