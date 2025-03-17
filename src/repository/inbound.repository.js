const InboundItem = require('../models/inbound.model');

async function createInboundItem(data) {
  return await InboundItem.create(data);
}

async function getAllInboundItems() {
  return await InboundItem.find({ confirmed: false }).sort({ createdAt: -1 });
}

async function getInboundItemBySku(sku) {
  return await InboundItem.findOne({ sku });
}

async function updateInboundItem(sku, updateData) {
  return await InboundItem.findOneAndUpdate({ sku }, updateData, { new: true });
}

async function deleteInboundItem(sku) {
  return await InboundItem.findOneAndDelete({ sku });
}

module.exports = {
  createInboundItem,
  getAllInboundItems,
  getInboundItemBySku,
  updateInboundItem,
  deleteInboundItem
};
