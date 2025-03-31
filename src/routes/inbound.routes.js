const express = require('express');
const router = express.Router();
const InboundController = require('../controller/inbound.controller');
const authenticateJWT = require("../middleware/authMiddleware"); // 인증 미들웨어 추가

const inboundController = new InboundController();

//입고에 postAPI만 일단 인증하게 해놓음
//router.post('/', authenticateJWT, inboundController.createInboundItem);
router.post('/', inboundController.createInboundItem);
router.get('/', inboundController.getAllInboundItems);
router.get('/:sku', inboundController.getInboundItemBySku);
router.put('/:sku', inboundController.updateInboundItem);
router.delete('/:sku', inboundController.deleteInboundItem);

// 입고 확정 API 추가
router.put("/:sku/confirm", (req, res) => inboundController.confirmInbound(req, res));

module.exports = router;
