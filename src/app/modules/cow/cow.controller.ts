import { Request, Response } from "express";
import cowService from './cow.service';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields, cowFilterableFields } from '../../../constants/pagination';

const createCow = async (req: Request, res: Response) => {
  try {
    
   
    const result = await cowService.createow(req.body)
    
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: 'Failed to create Cow',
    });
  }
};

export const getCows = async (req: Request, res: Response) => {
  try {
    
     const paginationOptions = pick(req.query, paginationFields);
     const filters = pick(req.query, cowFilterableFields);
    
    const Cows = await cowService.getAllCows(filters, paginationOptions);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cows retrieved successfully",
      data: Cows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};


export const getSingleCow = async (req: Request, res: Response) => {
  try {

    const { id } = req.params; 
    const result = await cowService.singleCow(id);

    res.status(200).json( {
      statusCode: 200,
    success: true,
    message: 'Cow fetched successfully !',
    data: result,
  });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const updateSingleCow = async (req: Request, res: Response) => {
  try {

    const { id } = req.params; 
    const updatedData = req.body;
    const result = await cowService.updateCow(id, updatedData);

    res.status(200).json( {
      statusCode: 200,
    success: true,
    message: 'Cow fetched successfully !',
    data: result,
  });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteCow = async (req: Request, res: Response)  => {
  
    const deletedCow = await cowService.deleteCow(req.params.id);

    if (!deletedCow) {
      return res.status(404).json({
        success: false,
        message: "Cow not found",
        errorMessages: [],
        stack: "",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Cow deleted successfully",
      data: deletedCow,
    });
  
  }

export default{
  createCow,
  getCows,
  getSingleCow,
  updateSingleCow,
  deleteCow
}
