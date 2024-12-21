import { Request, Response } from "express";
import  Cow  from './cow.model';
import { ICow } from './cow.interface';
import { IPaginationOptions, ICowFilters } from './cow.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import {cowSearchableFields} from './cow.constant'


const createow = async (payload: ICow): Promise<ICow | null> => {
    const { name, age, price, location, breed, weight, label, category, seller } = payload;
    
    const newCow = new Cow({
        name,
        age,
        price,
        location,
        breed,
        weight,
        label,
        category,
        seller,
      });
      
      const savedCow = await newCow.save();
     
      if (!savedCow) {
        throw new Error('Failed to create Cow!')
      }
      return savedCow
  };

  //Get All Cows
const getAllCows = async ( 
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
) => {
  try {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];

    if (searchTerm) {
      andConditions.push({
        $or: cowSearchableFields.map((field: string) => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i', // Case-insensitive search
          },
        })),
      });
    }

    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }

      // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }


  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

    const total = await Cow.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  } catch (error) {
    console.error("Error fetching Cows:", error); 
    throw new Error("Error fetching Cows");
  }
};

//Get a Single Cow
const singleCow = async (id: string): Promise<ICow| null> => {
  const result = await Cow.findOne({  _id: id })
   
  return result;
};

//Update a Cow.service
export const updateCow = async ( id: string,payload: Partial<ICow>): Promise<ICow | null> => {
  const updatedCow = await Cow.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedCow) {
    throw new Error("Error fetching Cows");
  }
   return updatedCow; 
};

//Delete a Cow
export const deleteCow = async (id: string): Promise<ICow | null> => {

  // Find the Cow by ID and delete it
  const deletedCow = await Cow.findByIdAndDelete(id);

  if (!deletedCow) {
    throw new Error("Error fetching Cows");
  }
   return deletedCow; 
};

   export default {createow, getAllCows, singleCow, updateCow, deleteCow} 