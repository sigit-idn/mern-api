const bodyParser = require("body-parser");
const express = require("express");
const { connect } = require("mongodb");
const { diskStorage } = require("multer");
const multer = require("multer");
const authRouter = require("./src/routes/auth");

const server = express();

const fileStorage = diskStorage({
  destination : (req, file, callback) => {
    callback(null, 'images')
  },

  filename : (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname)
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg') {
    callback(null, true)
  }else {
    callback(null, false)
  }
}

server.use(bodyParser.json());
server.use(multer({storage : fileStorage, fileFilter}).single('image'))


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
  console.log("salah " + error);
  res.status(status).json({ message, data });
});

// connect('mongodb+srv://sigit:9IKqr3WR2FSMt8kZ@cluster0.b3oi5.mongodb.net/blog?retryWrites=true&w=majority')
// .then(() => server.listen(4000)).catch(error => console.log('connection error: ' + error))

server.listen(4000)