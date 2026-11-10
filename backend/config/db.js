const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Mongo Error: ${err.message}`);
    console.log("⚠️ Running in MOCK mode without DB - OK for demo");
  }
};
module.exports = connectDB;