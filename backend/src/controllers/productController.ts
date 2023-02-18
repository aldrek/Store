import { Request, Response } from "express";
import { Product } from "../models/product/product";

// -------------------------------------------------------------------------------------------
// Main goal: User should be able to add product
// -------------------------------------------------------------------------------------------
export const addProduct = async (req: Request, res: Response) => {
  const product = new Product(req.body);

  // validation for product

  // save product
  await product.save();

  res.status(200).send({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  res.send("deleteProduct");
};

export const listProduct = async (req: Request, res: Response) => {
  res.send("listProduct");
};

export const editProduct = async (req: Request, res: Response) => {
  res.send("editProduct");
};

export const addProductItem = async (req: Request, res: Response) => {
  res.send("addProductItem");
};
export const deleteProductItem = async (req: Request, res: Response) => {
  res.send("deleteProductItem");
};
export const listProductItem = async (req: Request, res: Response) => {
  res.send("listProductItem");
};
export const editProductItem = async (req: Request, res: Response) => {
  res.send("editProductItem");
};
export const addWishlistItem = async (req: Request, res: Response) => {
  res.send("addWishlistItem");
};
export const deleteWishlistItem = async (req: Request, res: Response) => {
  res.send("deleteWishlistItem");
};
export const listWishlistItem = async (req: Request, res: Response) => {
  res.send("listWishlistItem");
};
