const express = require('express');
const prerender = require('prerender-node');
const path = require('path');

const app = express();

// Use prerender.io middleware as the first middleware
app.use(prerender.set('prerenderToken', 'HFcLhaEKe3iKKCX9vybj'));

// Log the User-Agent
app.use((req, res, next) => {
  console.log('Request User-Agent:', req.headers['user-agent']);
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
