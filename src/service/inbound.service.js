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

  // "입고 확정"이 된 경우에만 Kafka 메시지를 전송
  if (updateData.confirmed === true) {
    try {
      await producer.send({
        topic: "inbound-confirmed",
        messages: [
          {
            key: sku,
            value: JSON.stringify(updatedItem),
            headers: { "content-type": "application/json" },
          },
        ],
      });
      console.log(`📩 Kafka 메시지 전송 완료: SKU ${sku}`);
    } catch (error) {
      console.error("🚨 Kafka 메시지 전송 실패:", error);
    }
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
