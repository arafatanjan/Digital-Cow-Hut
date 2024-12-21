import  User  from "../user/user.model";
import  Cow  from "../cow/cow.model";
import { CowLabel } from '../cow/cow.interface';
 import  Order  from "./order.model";

 
import mongoose from "mongoose";


 const createOrderService = async (cowId: string, buyerId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
   
    const cow = await Cow.findById(cowId);
    const buyer = await User.findById(buyerId);

    if (!cow || !buyer) {
      throw new Error("Cow or Buyer not found");
    }

    if (buyer.budget < cow.price) {
      throw new Error("Buyer does not have enough money");
    }

    // Update Cow, Buyer, and Seller information
    cow.label = CowLabel.SOLD_OUT;
    buyer.budget -= cow.price;
    const seller = await User.findById(cow.seller);
    if (seller) {
      seller.income += cow.price;
    }

    // Save updated documents within the transaction
    await cow.save({ session });
    await buyer.save({ session });
    if (seller) await seller.save({ session });

    // Create a new order
    const newOrder = new Order({ cow: cowId, buyer: buyerId });
    await newOrder.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return newOrder; // Return the newly created order
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    throw error; 
  }
};

export default {
    createOrderService
}
