import mongoose, { Schema, Types, model } from "mongoose";

const Wishlistschema = new Schema<IWishlist>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
    },
    product_id: {
      type: Schema.Types.ObjectId,
    },
  },
  { collection: "wishlist", timestamps: true }
);

const Wishlist = model<IWishlist>("wishlist", Wishlistschema);

export { Wishlist };
interface IWishlist {
  user_id: Types.ObjectId;
  product_id: Types.ObjectId;
}
