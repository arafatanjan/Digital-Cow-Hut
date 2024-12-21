
import mongoose, { Document, Schema } from 'mongoose';

// Enum for User roles (Seller and Buyer)
export enum UserRole {
    SELLER = 'seller',
    BUYER = 'buyer',
  }

// Interface for the User document
export interface IUser extends Document {
    phoneNumber: string;
    role: UserRole;
    password: string;
    name: {
      firstName: string;
      lastName: string;
    };
    address: string;
    budget: number;  // Savings for buying the cow
    income: number;  // Money from selling the cow
    createdAt: Date;
    updatedAt: Date;
  }

  export type IAcademicCowFilters = {
    searchTerm?: string;
  };


 