import mongoose, {  Schema } from 'mongoose';
import { IUser } from './user.interface';

export enum UserRole {
    SELLER = 'seller',
    BUYER = 'buyer',
  }




// User schema definition
const userSchema = new Schema<IUser>({
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,  // Enforcing unique phone numbers
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: Object.values(UserRole),  // Enum validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  name: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    default: 0,  // Default value of 0 for budget
  },
  income: {
    type: Number,
    required: [true, 'Income is required'],
    default: 0,  // Default value of 0 for income
  },
}, { timestamps: true });  // Automatically adds `createdAt` and `updatedAt` timestamps

// Creating the User model from the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
