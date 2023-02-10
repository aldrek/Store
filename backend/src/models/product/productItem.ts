import mongoose, { model, Schema, Types } from "mongoose";
import { productCategory, productColor, productSize } from "../types";

const productItemScheme = new Schema<IProductItem>({
  product_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(productCategory),
    default: productCategory.hats,
  },
  color: {
    type: String,
    enum: Object.values(productColor),
    default: productColor.red,
  },
  image: {
    type: String,
  },
  size: {
    type: String,
    enum: Object.values(productSize),
    default: productSize.x,
  },
});

const ProductItem = model<IProductItem>("product_item", productItemScheme);

export { ProductItem };

interface IProductItem {
  product_id: Types.ObjectId;
  category: string;
  color: string;
  size: string;
  image: string;
}
