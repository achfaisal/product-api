require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.SERVER_PORT || 3003;
const { sequelize } = require("./models");

const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

sequelize
  .authenticate()
  .then(function (error) {
    console.log("database connection has sucessfully connected");
  })
  .catch(function (error) {
    console.log("unable to connect to database" + error);
  });

app.get("/home", (req, res) => {
  res.send({ Name: "myProductApi", version: "1.0.0", author: "Faisal" });
});

app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
