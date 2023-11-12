const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB, {})
  .then(() => {
    console.log("db connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });
