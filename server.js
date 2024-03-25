const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  // .connect(
  //   "mongodb+srv://Mar4ella:ktybyuhflcrfz40@cluster0.g1mqafu.mongodb.net/db-drugs?retryWrites=true&w=majority&appName=Cluster0"
  // )
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
