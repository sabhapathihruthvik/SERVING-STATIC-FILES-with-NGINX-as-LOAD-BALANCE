const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'Unknown App';

// Middleware to serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route – show container info and app name
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to ${appName}!</h1>
    <p>Running in container: <strong>${os.hostname()}</strong></p>
    <p>Server time: ${new Date().toISOString()}</p>
  `);
});

// Simple JSON API route
app.get('/api/time', (req, res) => {
  res.json({
    message: `Hello from ${appName}!`,
    serverTime: new Date().toISOString(),
    containerName: os.hostname()
  });
});

// Dynamic greeting route
app.get('/greet/:name', (req, res) => {
  const name = req.params.name;
  res.send(`
    <h1>Hello, ${name}!</h1>
    <p>Welcome to ${appName} 🚀</p>
    <p>Running in container: <strong>${os.hostname()}</strong></p>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`${appName} running on http://localhost:${port}`);
  console.log(`Container name (hostname): ${os.hostname()}`);
});
