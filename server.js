const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. TRUST PROXY: Required for Render to see real visitor IPs
app.set('trust proxy', true);

app.use(cors());
app.use(express.json());

// 2. THE TRAFFIC LOGGER (Middleware)
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' });
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const method = req.method;
    const url = req.url;
    const userAgent = req.get('User-Agent');

    // This logs to your Render "Logs" tab in real-time
    console.log(`[${timestamp}] 🚦 VISIT: ${method} ${url} | IP: ${ip} | Device: ${userAgent.slice(0, 50)}...`);
    
    next();
});

// 3. Serve your static files
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

// Health check for deployment monitoring
app.get('/status', (req, res) => {
    res.json({ 
        system: "ELISY 254", 
        status: "Online", 
        serverTime: new Date().toISOString() 
    });
});

app.listen(PORT, () => {
    console.log(`
    ===========================================
    🚀 ELISY 254 SYSTEM IS LIVE
    📍 Port: ${PORT}
    🌐 Monitoring Active: Yes
    ===========================================
    `);
});