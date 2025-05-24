require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin'],
}));
app.use(express.json());
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  console.log('DB synced');
  app.listen(3001, () => console.log('Server running on http://localhost:3001'));
});
