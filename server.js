const express = require('express');

const userRouter = require('./users/userRouter');
const postROuter = require('./posts/postRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
    //log information about the request to the console -> GET to /
    const method = req.method;
    const endpoint = req.originalUrl;
    const time = Date().toISOString();
    console.log(`${method} to ${endpoint} at ${time}`)
  
    next(); //moves the request to the next middleware
}

server.use(express.json());
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);


module.exports = server;
