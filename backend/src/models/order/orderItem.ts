import mongoose, { Schema, Types, model } from "mongoose";

const orderItemSchema = new Schema<IOrderItem>(
  {
    quantity: {
      type: Number,
      default: 1,
    },
    order_id: {
      type: Schema.Types.ObjectId,
    },
    product_item: {
      type: Schema.Types.ObjectId,
    },
  },
  { collection: "order_item", timestamps: true }
);

const OrderItem = model<IOrderItem>("order_item", orderItemSchema);

export { OrderItem };
interface IOrderItem {
  product_item: Types.ObjectId;
  order_id: Types.ObjectId;
  quantity: number;
}
