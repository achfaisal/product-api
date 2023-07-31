require("dotenv").config();

const express = require("express");
const PORT = process.env.SERVER_PORT || 3003;

const productRouter = require("./routes/product.route");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ Name: "myProductApi", version: "1.0.0", author: "Faisal" });
});

app.use("/api/products", productRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
