import express from "express";
import { userRouter } from "./routers/user";

const app = express();

app.use(userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
