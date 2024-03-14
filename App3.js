require("dotenv").config();
const express = require("express");
const path = require("path");
app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { Schema } = mongoose;

const productRouter = require("./Routes/product");
const userRouter = require("./Routes/user");

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
}
main().catch((err) => console.log(err));

//body-parser
// console.log('env',process.env.DB_PASSWORD);
app.use(cors());
app.use(express.json());
app.use(morgan("dev", "default"));
app.use("/products", productRouter.Router);
app.use("/users", userRouter.Router);

app.use(express.static(path.join("react-app", "build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "react-app", "build", "index.html"));
});

//MVC model - view -controller
//model : bussiness logic or data
//view  : display page
//controller : which is connect the model & view
//app

//Server Listen
app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
