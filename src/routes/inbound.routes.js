const express = require('express');
const router = express.Router();
const InboundController = require('../controller/inbound.controller');

const inboundController = new InboundController();

router.post('/', inboundController.createInboundItem);
router.get('/', inboundController.getAllInboundItems);
router.get('/:sku', inboundController.getInboundItemBySku);
router.put('/:sku', inboundController.updateInboundItem);
router.delete('/:sku', inboundController.deleteInboundItem);

// 입고 확정 API 추가
router.put("/:sku/confirm", (req, res) => inboundController.confirmInbound(req, res));

module.exports = router;
