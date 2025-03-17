const InboundService = require('../service/inbound.service');

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
