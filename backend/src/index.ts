import express from "express";
import { connection } from "./config/db";
import { userRouter } from "./routers/user.router";
import { orderRouter } from "./routers/order.router";
import { productRouter } from "./routers/products.router";

import dotenv from "dotenv";
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
