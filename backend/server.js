import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

// console.log(process.env.MONGO_URI);
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});

// 8LN3ZJr42EzT2QhV
