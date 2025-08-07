const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(cors({
  origin: ['https://zuno-zr11.vercel.app'], // allow your frontend
  credentials: true, // allow cookies, sessions, auth headers
}));
// app.options('*', cors());
app.use(express.json());




// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});