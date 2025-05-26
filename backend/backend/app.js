// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const sequelize = require('./config/database');
// const adminRoutes = require('./routes/admin');
// const authRoutes = require('./routes/auth');
// const wishListRoutes = require('./routes/wishlist'); // Add this

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-admin'],
// }));
// app.use(express.json());

// app.use('/api/admin', adminRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/wishList', wishListRoutes); // Add this to mount the routes

// sequelize.sync().then(() => {
//   console.log('DB synced');
//   app.listen(3001, () => console.log('Server running on http://localhost:3001'));
// });
require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const wishListRoutes = require('./routes/wishlist');

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Match your frontend port
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin'],
  credentials: true
}));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/wishList', wishListRoutes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
