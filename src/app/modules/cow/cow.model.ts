import mongoose, { Document, Schema } from 'mongoose';
import { CowLocation, CowBreed, CowLabel, CowCategory, ICow } from './cow.interface';

// // Enum for locations
// export enum CowLocation {
//   DHAKA = 'Dhaka',
//   CHATTOGRAM = 'Chattogram',
//   BARISHAL = 'Barishal',
//   RAJSHAHI = 'Rajshahi',
//   SYLHET = 'Sylhet',
//   COMILLA = 'Comilla',
//   RANGPUR = 'Rangpur',
//   MYMENSINGH = 'Mymensingh',
// }

// // Enum for cow breeds
// export enum CowBreed {
//   BRAHMAN = 'Brahman',
//   NELLORE = 'Nellore',
//   SAHIWAL = 'Sahiwal',
//   GIR = 'Gir',
//   INDIGENOUS = 'Indigenous',
//   THARPARKAR = 'Tharparkar',
//   KANKREJ = 'Kankrej',
// }

// // Enum for cow labels (status)
// export enum CowLabel {
//   FOR_SALE = 'for sale',
//   SOLD_OUT = 'sold out',
// }

// // Enum for cow categories
// export enum CowCategory {
//   DAIRY = 'Dairy',
//   BEEF = 'Beef',
//   DUAL_PURPOSE = 'Dual Purpose',
// }

// // Interface for the Cow document
// export interface ICow extends Document {
//   name: string;
//   age: number;
//   price: number;
//   location: CowLocation;
//   breed: CowBreed;
//   weight: number;
//   label: CowLabel;
//   category: CowCategory;
//   seller: mongoose.Types.ObjectId;  // Reference to the seller (User)
//   createdAt: Date;
//   updatedAt: Date;
// }

// Cow schema definition
const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: [true, 'Cow name is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Cow age is required'],
    min: [0, 'Age must be a positive number'],
  },
  price: {
    type: Number,
    required: [true, 'Cow price is required'],
    min: [0, 'Price must be a positive number'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: Object.values(CowLocation),  
  },
  breed: {
    type: String,
    required: [true, 'Cow breed is required'],
    enum: Object.values(CowBreed),  
  },
  weight: {
    type: Number,
    required: [true, 'Cow weight is required'],
    min: [0, 'Weight must be a positive number'],
  },
  label: {
    type: String,
    required: [true, 'Cow label is required'],
    default: CowLabel.FOR_SALE,  
    enum: Object.values(CowLabel),  
  },
  category: {
    type: String,
    required: [true, 'Cow category is required'],
    enum: Object.values(CowCategory),  
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Seller is required'],
    ref: 'User',  
  },
}, { timestamps: true });  

// Creating the Cow model from the schema
const Cow = mongoose.model<ICow>('Cow', cowSchema);

export default Cow;
