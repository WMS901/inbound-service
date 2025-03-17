const InboundRepository = require('../repository/inbound.repository');
const { generateSku } = require('../utils/sku-generator');

async function createInboundItem(data) {
  const sku = generateSku(data.category, data.name);
  const newItem = { ...data, sku };
  return await InboundRepository.createInboundItem(newItem);
}

async function getAllInboundItems() {
  return await InboundRepository.getAllInboundItems();
}

async function getInboundItemBySku(sku) {
  return await InboundRepository.getInboundItemBySku(sku);
}

async function updateInboundItem(sku, updateData) {
  return await InboundRepository.updateInboundItem(sku, updateData);
}

async function deleteInboundItem(sku) {
  return await InboundRepository.deleteInboundItem(sku);
}

module.exports = {
  createInboundItem,
  getAllInboundItems,
  getInboundItemBySku,
  updateInboundItem,
  deleteInboundItem
};
