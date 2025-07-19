require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    console.log("📡 Connecting to MongoDB URI:", uri);

    await mongoose.connect(uri, { dbName: 'licenseDB' }); // ✅ <-- added dbName here

    console.log('✅ MongoDB connected successfully');

    await mongoose.disconnect();
    console.log('🔌 MongoDB connection closed');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testConnection();
