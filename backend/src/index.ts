import express from "express";
import { connection } from "./config/db";
import { userRouter } from "./routers/user.router";
import { orderRouter } from "./routers/order.router";
import { productRouter } from "./routers/products.router";

import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";

import dotenv from "dotenv";
dotenv.config({
  path: `./config/.env.${process.env.NODE_ENV || "dev"}`,
});

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  });

app.use(middleware.handle(i18next));

app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);

connection();

export { app };
