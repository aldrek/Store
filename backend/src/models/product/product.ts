import mongoose, { Schema, model } from "mongoose";
import { productCategory, productStatus } from "../types";

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stockNu: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(productStatus),
    default: productStatus.not_avaiable,
  },
  category: {
    type: String,
    enum: Object.values(productCategory),
    default: productCategory.hats,
  },
});

interface IProduct {
  name: string;
  description: string;
  price: number;
  status: productStatus;
  stockNu: number;
  category: productCategory;
}

const Product = model<IProduct>("product", productSchema);

export { Product };
