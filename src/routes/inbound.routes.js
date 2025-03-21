const express = require('express');
const router = express.Router();
const InboundController = require('../controller/inbound.controller');
const authenticateJWT = require("../middleware/authMiddleware"); // JWT 인증 미들웨어 추가

const inboundController = new InboundController();

// ✅ JWT 인증이 필요한 API
router.post('/', authenticateJWT, (req, res) =>
  inboundController.createInboundItem(req, res)
);
router.put('/:sku', authenticateJWT, (req, res) =>
  inboundController.updateInboundItem(req, res)
);
router.delete('/:sku', authenticateJWT, (req, res) =>
  inboundController.deleteInboundItem(req, res)
);

// ✅ 인증 없이 접근 가능한 API
router.get('/', (req, res) =>
  inboundController.getAllInboundItems(req, res)
);
router.get('/:sku', (req, res) =>
  inboundController.getInboundItemBySku(req, res)
);
router.put('/:sku/confirm', (req, res) =>
  inboundController.confirmInbound(req, res)
);

module.exports = router;
