import { Schema, model, Types } from 'mongoose';
import  Cow  from '../cow/cow.model';  
import  User  from '../user/user.model';  

// Enum for Order Status (optional)
export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// Define the Order schema
const orderSchema = new Schema(
  {
    cow: {
      type: Types.ObjectId,
      ref: 'Cow',  // Reference to the Cow model
      required: true,
    },
    buyer: {
      type: Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    seller: {
      type: Types.ObjectId,
      ref: 'User',  
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus), 
      default: OrderStatus.PENDING,  
    },
    orderDate: {
      type: Date,
      default: Date.now,  
    },
    transactionId: {
      type: String,
      required: false,  
    },
  },
  {
    timestamps: true,  
  }
);

// Create the Order model based on the schema
const Order = model('Order', orderSchema);

export { Order, OrderStatus };
