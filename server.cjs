// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const mongoose = require('mongoose');

// ✅ Correct route path (no nested `routes/routes`)
const licenseRoutes = require('./routes/license.js');
 

const app = express();
const PORT = process.env.PORT || 5001;



// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/licenses', licenseRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});
