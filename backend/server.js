const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../frontend')));

mongoose.connect(process.env.MONGO_URI, { dbName: 'property-trust' })
.then(() => console.log('✅ 【entity-MongoDB¦canonical_name=MongoDB】 Connected: property-trust'))
.catch(err => console.log('❌ 【entity-MongoDB¦canonical_name=MongoDB】 Error:', err));

app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/verify', require('./routes/verificationRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', app: 'Machpadaco Property Trust', rc: '8489988', code: 'AB 16 A55 AK 04', time: new Date().toISOString() });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🏠 AB 16 A55 AK 04 - RC 8489988`);
});