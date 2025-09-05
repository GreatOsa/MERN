import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

// console.log(process.env.MONGO_URI);
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000 ");
});

// 8LN3ZJr42EzT2QhV
