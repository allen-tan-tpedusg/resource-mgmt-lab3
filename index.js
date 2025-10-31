var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 5050;
var startPage = "index.html";

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('./public'));

const { addResource } = require('./utils/AddResourceUtil')
app.post('/add-resource', addResource);

// Serve the start page at the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/' + startPage);
});

// Start the server and log the URL
server = app.listen(PORT, function () {
  const address = server.address();
  const baseUrl = `http://${address.address == '::' ? 'localhost' : address.address}:${address.port}`;
  console.log(`Demo project at: ${baseUrl}`);
});

module.exports = { app, server };