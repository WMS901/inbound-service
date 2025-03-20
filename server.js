require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const inboundRoutes = require('./src/routes/inbound.routes');
const app = express();
const PORT = 1050;
const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}`;

app.use(cors());
app.use(express.json());

app.use('/api/inbound', inboundRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));
