import { Request, Response } from "express";

export const addOrder = async (req: Request, res: Response) => {
  res.send("addOrder");
};
export const deleteOrder = async (req: Request, res: Response) => {
  res.send("deleteOrder");
};
export const listOrders = async (req: Request, res: Response) => {
  res.send("listOrders");
};
export const editOrder = async (req: Request, res: Response) => {
  res.send("editOrder");
};
export const addOrderItem = async (req: Request, res: Response) => {
  res.send("addOrderItem");
};
export const deleteOrderItem = async (req: Request, res: Response) => {
  res.send("deleteOrderItem");
};
export const addOrderList = async (req: Request, res: Response) => {
  res.send("addOrderList");
};
export const editOrderItem = async (req: Request, res: Response) => {
  res.send("editOrderItem");
};
