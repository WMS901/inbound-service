const InboundService = require('../service/inbound.service');
const producer = require('../config/kafka'); // ✅ Kafka Producer 추가

class InboundController {
  async createInboundItem(req, res) {
    try {
      const newItem = await InboundService.createInboundItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllInboundItems(req, res) {
    try {
      const items = await InboundService.getAllInboundItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInboundItemBySku(req, res) {
    try {
      const item = await InboundService.getInboundItemBySku(req.params.sku);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateInboundItem(req, res) {
    try {
      const updatedItem = await InboundService.updateInboundItem(req.params.sku, req.body);
      if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ✅ "입고 확정" (confirmInbound) API 개선 (중복 메시지 방지)
  async confirmInbound(req, res) {
    try {
      const { sku } = req.params;
      
      // 기존 데이터 확인
      const existingItem = await InboundService.getInboundItemBySku(sku);
      if (!existingItem) return res.status(404).json({ message: "Item not found" });

      // ✅ 이미 확정된 항목이면 Kafka 메시지 전송 안 함
      if (existingItem.confirmed) {
        return res.status(400).json({ message: "이미 입고 확정된 항목입니다." });
      }

      // ✅ 입고 확정 처리
      const confirmedItem = await InboundService.updateInboundItem(sku, { confirmed: true });

      // ✅ Kafka 메시지 전송 (입고 확정된 경우만)
      try {
        await producer.send({
          topic: "inbound-confirmed",
          messages: [
            {
              key: sku,
              value: JSON.stringify(confirmedItem),
              headers: { "content-type": "application/json" }, // 메시지 헤더 추가
            },
          ],
        });
        console.log(`📩 Kafka 메시지 전송 완료: SKU ${sku}`);
      } catch (kafkaError) {
        console.error("🚨 Kafka 메시지 전송 실패:", kafkaError);
      }

      res.status(200).json({ message: "입고 확정 완료", item: confirmedItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteInboundItem(req, res) {
    try {
      const deletedItem = await InboundService.deleteInboundItem(req.params.sku);
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = InboundController;
