const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 5000; // Explicitly set to 5000 for HTTPS

// Path to your SSL certificate and key
// const SSL_KEY = './mylocalhost.key';
// const SSL_CERT = './mylocalhost.pem';

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const clioRoutes = require("./routes/clio");

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use("/", clioRoutes);

app.use('/random', express.static(path.join(__dirname, 'public')));

// const sslOptions = {
//     key: fs.readFileSync(SSL_KEY),
//     cert: fs.readFileSync(SSL_CERT)
// };

// Start HTTPS Server
// https.createServer(sslOptions, app).listen(PORT, () => {
//     console.log(`Server running securely on https://localhost:${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
