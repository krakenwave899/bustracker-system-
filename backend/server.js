const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Make io accessible to routes
app.set('io', io);

// Routes
app.use('/api/buses',    require('./routes/busRoutes'));
app.use('/api/routes',   require('./routes/routeRoutes'));
app.use('/api/stops',    require('./routes/stopRoutes'));
app.use('/api/eta',      require('./routes/etaRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/auth',     require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


// Basic route to test
app.get('/', (req, res) => {
  res.json({ message: 'Bus Tracking API is running!' });
});

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
