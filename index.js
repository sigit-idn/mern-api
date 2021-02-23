const express = require("express");

const app = express();

app.use(() => {
  console.log("Hello");
  console.log("Hello lagi");
  console.log("Hello tiga");
});
app.listen(4000);
