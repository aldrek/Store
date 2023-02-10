import mongoose, { Schema, Types, model } from "mongoose";
import { orderStatus } from "../types";

const orderSchema = new Schema<IOrder>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: Object.values(orderStatus),
      default: orderStatus.pending,
    },
  },
  { collection: "order", timestamps: true }
);

const Order = model<IOrder>("order", orderSchema);

export { Order };
interface IOrder {
  user_id: Types.ObjectId;
  status: String;
}
