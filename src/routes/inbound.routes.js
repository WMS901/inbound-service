const express = require('express');
const router = express.Router();
const InboundController = require('../controller/inbound.controller');
const authenticateJWT = require("../middleware/authMiddleware"); // JWT 인증 미들웨어 추가

const inboundController = new InboundController();

// JWT 인증이 필요한 API
router.post('/', authenticateJWT, inboundController.createInboundItem);  // 입고 생성
router.put('/:sku', authenticateJWT, inboundController.updateInboundItem); // 입고 수정
router.delete('/:sku', authenticateJWT, inboundController.deleteInboundItem); // 입고 삭제

// 인증 없이 접근 가능한 API
router.get('/', inboundController.getAllInboundItems); // 전체 입고 목록 조회 (Public)
router.get('/:sku', inboundController.getInboundItemBySku); // 특정 SKU 입고 조회 (Public)
router.put("/:sku/confirm", inboundController.confirmInbound); //입고 확정은 JWT 인증 없이 처리

module.exports = router;
