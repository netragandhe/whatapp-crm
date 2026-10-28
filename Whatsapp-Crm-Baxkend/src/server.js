const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const socketManager = require('./sockets/socketManager');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Socket.io Setup
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:5173',
    'https://whatsapp-crm.kiaantechnology.com'
].filter(Boolean);

const io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (
                allowedOrigins.includes(origin) ||
                /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
            ) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000
});

// Initialize the socket manager so controllers can emit events
socketManager.init(io);

// Track connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);

    // User joins their role-based room
    socket.on('join:room', (room) => {
        socket.join(room);
        console.log(`[Socket] ${socket.id} joined room: ${room}`);
        socket.emit('join:ack', { room, message: `Joined ${room} channel` });
    });

    // Client requests a fresh dashboard push
    socket.on('dashboard:request', () => {
        socket.emit('dashboard:refresh', {
            type: 'dashboard:refresh',
            timestamp: new Date(),
            data: { msg: 'Dashboard refreshed' }
        });
    });

    // Ping-pong for connection health check
    socket.on('ping', () => {
        socket.emit('pong', { timestamp: new Date() });
    });

    socket.on('disconnect', (reason) => {
        connectedUsers.delete(socket.id);
        console.log(`[Socket] Client disconnected: ${socket.id} — Reason: ${reason}`);
    });
});

// Make io accessible to routes via req.app.get('io')
app.set('io', io);

const { initSlaJob } = require('./jobs/slaJob');

server.listen(PORT, () => {
    console.log(`✅ CRM Server running on port ${PORT}`);
    console.log(`🔗 Frontend: ${process.env.FRONTEND_URL}`);
    console.log(`📡 Socket.io: Active`);
    
    // Start Background Jobs
    initSlaJob();
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});
