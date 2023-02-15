import express from "express";
import { connection } from "./config/db";
import { userRouter } from "./routers/user.router";
import dotenv from "dotenv";
import { User } from "./models/user/user";
import { UserSettings } from "./models/user/userSettings";
import { Product } from "./models/product/product";
import {
  orderStatus,
  productCategory,
  productColor,
  productSize,
  productStatus,
} from "./models/types";
import { ProductItem } from "./models/product/productItem";
import { Order } from "./models/order/order";

import { OrderItem } from "./models/order/orderItem";
import { orderRouter } from "./routers/order.router";
import { productRouter } from "./routers/products.router";
dotenv.config();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);

connection();

export { app };
