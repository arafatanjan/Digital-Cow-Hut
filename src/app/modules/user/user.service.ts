import { Request, Response } from "express";
import  User  from './user.model';
import { IUser } from './user.interface';

//Create a User
const createUser = async (newUsers: IUser): Promise<IUser | null> => {
  const { password, role, name, phoneNumber, address, budget } = newUsers;
  
    const newUser = new User({
      password,
      role,
      name,
      phoneNumber,
      address,
      budget,
      income: 0, // Default value
    });
    
    const savedUser = await newUser.save();
   
    if (!savedUser) {
      throw new Error('Failed to create user!')
    }
    return savedUser
};

//Get All Users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error); 
    throw new Error("Error fetching users");
  }
};

//Get a Single User
const singleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({  _id: id })
   
  return result;
};


//Update a user.service
export const updateUser = async ( id: string,payload: Partial<IUser>): Promise<IUser | null> => {
    const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedUser) {
      throw new Error("Error fetching users");
    }
     return updatedUser; 
};

//Delete a User
export const deleteUser = async (id: string): Promise<IUser | null> => {
  
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error("Error fetching users");
    }
     return deletedUser; 
};

export default {
  createUser,
  getAllUsers,
  singleUser,
  updateUser,
  deleteUser
}