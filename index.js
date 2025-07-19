require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const licenseRoutes = require('./routes/license');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use('/api/licenses', licenseRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please stop the other process or use a different port.`);
        process.exit(1);  // Exit the app
      } else {
        throw err;
      }
    });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});
