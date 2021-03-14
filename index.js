const bodyParser = require("body-parser");
const express = require("express");
const { connect } = require("mongodb");

const server = express();

const authRouter = require("./src/routes/auth");

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});

server.use("/v1/auth", authRouter);
server.use("/v1/blog", require("./src/routes/blog"));
server.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const { message, data } = error;
  res.status(status).json({ message, data });
});

// connect('mongodb+srv://sigit:9IKqr3WR2FSMt8kZ@cluster0.b3oi5.mongodb.net/blog?retryWrites=true&w=majority')
// .then(() => server.listen(4000)).catch(error => console.log('connection error: ' + error))

server.listen(4000)