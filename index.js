const express = require("express");
const cors = require("cors");
require("dotenv/config");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authJWT = require("./helpers/jwt");
const products = require("./routes/products");
const categories = require("./routes/categories");
const orders = require("./routes/orders");
const users = require("./routes/users");
const errorHandler = require("./helpers/errorHandler");

const app = express();
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());
// middle ware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJWT());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

app.use(`/${api}/products/`, products);
app.use(`/${api}/categories/`, categories);
app.use(`/${api}/orders/`, orders);
app.use(`/${api}/users/`, users);

mongoose
  .connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("DB connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is listening to 3000 port!");
});
