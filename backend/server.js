const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const doctorRoutes = require('./routes/doctor');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/doctors', doctorRoutes);

const MONGODB_URI = 'mongodb://localhost:27017/doctorDB';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
