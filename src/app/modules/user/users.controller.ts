import { Request, Response } from 'express'
import usersService from './user.service'


const createUser = async (req: Request, res: Response) => {
  try {
    // const { password, role, name, phoneNumber, address, budget } = req.body;
   

    const result = await usersService.createUser(req.body)
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: 'Failed to create user',
    })
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};


export const getSingleUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params; 
    const result = await usersService.singleUser(id);

    res.status(200).json( {
      statusCode: 200,
    success: true,
    message: 'User fetched successfully !',
    data: result,
  });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

// updateSingleUser controller
export const updateSingleUser = async (req: Request, res: Response) => {
  try {

    const { id } = req.params; 
    const updatedData = req.body;
    const result = await usersService.updateUser(id, updatedData);

    res.status(200).json( {
      statusCode: 200,
    success: true,
    message: 'User fetched successfully !',
    data: result,
  });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteUser = async (req: Request, res: Response)  => {
  
    const deletedUser = await usersService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        errorMessages: [],
        stack: "",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: deletedUser,
    });
  
  }
;

export default {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser
}
