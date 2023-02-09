import express from "express";
import { connection } from "./config/db";
import { userRouter } from "./routers/user";
import dotenv from "dotenv";
import { User } from "./models/user";
dotenv.config();

const app = express();
app.use(userRouter);

connection();

// Eample
const user = new User({
  name: "Ahmad",
});
user.save();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
