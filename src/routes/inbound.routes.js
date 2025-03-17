const express = require('express');
const router = express.Router();
const InboundController = require('../controller/inbound.controller');

const inboundController = new InboundController();

router.post('/', inboundController.createInboundItem);
router.get('/', inboundController.getAllInboundItems);
router.get('/:sku', inboundController.getInboundItemBySku);
router.put('/:sku', inboundController.updateInboundItem);
router.delete('/:sku', inboundController.deleteInboundItem);

module.exports = router;
