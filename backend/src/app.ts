import express from "express";
import { connection } from "./config/db";
import { userRouter } from "./routers/user";
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
dotenv.config();

const app = express();
app.use(userRouter);

connection();

const user = new User({
  email: "UserWithSettings1@user.com",
  password: "123123123",
});

const settings = new UserSettings({
  user_id: user._id,
});

const product = new Product({
  name: "Product 1",
  description: "string",
  price: 100,
  status: productStatus.avaiable,
  stockNu: 100,
  category: productCategory.hats,
});

const productItem1 = new ProductItem({
  product_id: product._id,
  category: productCategory.hats,
  color: productColor.red,
  size: productSize.x,
  image: "imageUrl",
});

const productItem2 = new ProductItem({
  product_id: product._id,
  category: productCategory.hats,
  color: productColor.green,
  size: productSize.x,
  image: "imageUrl",
});

const productItem3 = new ProductItem({
  product_id: product._id,
  category: productCategory.hats,
  color: productColor.green,
  size: productSize.xx,
  image: "imageUrl",
});

const order = new Order({
  user_id: user._id,
  status: orderStatus.pending,
});

const orderItem = new OrderItem({
  product_item: productItem1._id,
  order_id: order._id,
  quantity: 1,
});

const orderItem1 = new OrderItem({
  product_item: productItem3._id,
  order_id: order._id,
  quantity: 1,
});

const orderItem2 = new OrderItem({
  product_item: productItem2._id,
  order_id: order._id,
  quantity: 1,
});

// user.save();
// settings.save();
// product.save();
// productItem1.save();
// productItem2.save();
// productItem3.save();
// order.save();
// orderItem1.save();
// orderItem2.save();
// orderItem.save();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
