const InboundRepository = require('../repository/inbound.repository');
const { generateSku } = require('../utils/sku-generator');
const producer = require('../config/kafka'); // ✅ Kafka Producer 추가

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
  const updatedItem = await InboundRepository.updateInboundItem(sku, updateData);

  if (!updatedItem) return null;

  // ✅ Kafka 메시지 발행 (입고 확정 시)
  try {
    await producer.send({
      topic: "inbound-confirmed", // ✅ Kafka 토픽 이름
      messages: [{ key: sku, value: JSON.stringify(updatedItem) }],
    });
    console.log(`📩 Kafka 메시지 전송 완료: SKU ${sku}`);
  } catch (error) {
    console.error("🚨 Kafka 메시지 전송 실패:", error);
  }

  return updatedItem;
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
