import { Request, Response } from "express";
import orderService from './order.service';

export const createOrder = async (req: Request, res: Response) => {
    try {
      const { cowId, buyerId } = req.body;
  
      // Call the service to create the order
      const newOrder = await orderService.createOrderService(cowId, buyerId);
  
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Order placed successfully",
        data: newOrder,
      });
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: 'Failed to create Cow',
          });
    }
  };


  export default {
    createOrder
  }