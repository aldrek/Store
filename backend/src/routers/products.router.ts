import express from "express";
import {
  addProduct,
  addProductItem,
  addWishlistItem,
  deleteProduct,
  deleteProductItem,
  deleteWishlistItem,
  editProduct,
  editProductItem,
  listProduct,
  listProductItem,
  listWishlistItem,
} from "../controllers/productController";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

// Product
router.post("/add", authMiddleware, addProduct);
router.post("/delete", deleteProduct);
router.get("/list", listProduct);
router.put("/edit", editProduct);

// Product item
router.post("/productItem/add", addProductItem);
router.post("/productItem/delete", deleteProductItem);
router.get("/productItem/list", listProductItem);
router.put("/productItem/edit", editProductItem);

// WishList
router.post("/wishlist/add", addWishlistItem);
router.post("/wishlist/delete", deleteWishlistItem);
router.get("/wishlist/list", listWishlistItem);

export { router as productRouter };
