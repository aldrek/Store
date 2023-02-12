import express from "express";
import {
  addOrder,
  addOrderItem,
  addOrderList,
  deleteOrder,
  deleteOrderItem,
  editOrder,
  editOrderItem,
  listOrders,
} from "../controllers/orderController";
const router = express.Router();

// Order
router.post("/add", addOrder);
router.post("/delete", deleteOrder);
router.get("/list", listOrders);
router.put("/edit", editOrder);

// Order item
router.post("/orderItem/add", addOrderItem);
router.post("/orderItem/delete", deleteOrderItem);
router.get("/orderItem/list", addOrderList);
router.put("/orderItem/edit", editOrderItem);

export { router as orderRouter };
