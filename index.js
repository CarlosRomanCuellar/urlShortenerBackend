const express = require("express");
const http = require("http");
const myrouter = require("./router");
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser')


const port = process.env.PORT || 5000;

const app = express();
app.use(myrouter);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(express.json());
// app.use('/', createProxyMiddleware({ target: 'http://localhost:3000/', changeOrigin: true }));

const server = http.createServer(app);

require('./db/mongoose');



server.listen(port, () => {
	console.log(`server is up on ${port}`);
});
