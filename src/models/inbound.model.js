const mongoose = require('mongoose');

const inboundSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  supplier: { type: String },
  location: { type: String },
  confirmed: { type: Boolean, default: false },
}, { timestamps: true });

const InboundItem = mongoose.model('InboundItem', inboundSchema);

module.exports = InboundItem;
