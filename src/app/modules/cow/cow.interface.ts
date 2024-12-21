import mongoose, { Document} from 'mongoose';

// Enum for locations
export enum CowLocation {
  DHAKA = 'Dhaka',
  CHATTOGRAM = 'Chattogram',
  BARISHAL = 'Barishal',
  RAJSHAHI = 'Rajshahi',
  SYLHET = 'Sylhet',
  COMILLA = 'Comilla',
  RANGPUR = 'Rangpur',
  MYMENSINGH = 'Mymensingh',
}

export enum CowBreed {
  BRAHMAN = 'Brahman',
  NELLORE = 'Nellore',
  SAHIWAL = 'Sahiwal',
  GIR = 'Gir',
  INDIGENOUS = 'Indigenous',
  THARPARKAR = 'Tharparkar',
  KANKREJ = 'Kankrej',
}


export enum CowLabel {
  FOR_SALE = 'for sale',
  SOLD_OUT = 'sold out',
}


export enum CowCategory {
  DAIRY = 'Dairy',
  BEEF = 'Beef',
  DUAL_PURPOSE = 'Dual Purpose',
}

// Interface for the Cow document
export interface ICow extends Document {
  name: string;
  age: number;
  price: number;
  location: CowLocation;
  breed: CowBreed;
  weight: number;
  label: CowLabel;
  category: CowCategory;
  seller: mongoose.Types.ObjectId;  // Reference to the seller (User)
  createdAt: Date;
  updatedAt: Date;
}

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type ICowFilters ={
  searchTerm?: string;
}