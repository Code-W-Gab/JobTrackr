import applicationSchema from "../models/application.schema";
import { createApplicationDTO, updateApplicationDTO, IdParams } from "../types/application.types";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const createApplication: RequestHandler<{}, {}, createApplicationDTO> = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Fixed: 400
          
    const newApplication = await applicationSchema.create(req.body)

    res.status(201).json({
      success: true,
      data: newApplication,
      message: "Application added successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const updateApplication: RequestHandler<IdParams, {}, updateApplicationDTO> = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Fixed: 400
      
    const application = await applicationSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
  
    if(!application) return res.status(404).json({ message: "Application not found"})
    res.status(200).json({
      success: true,
      data: application,
      message: "Application updated successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const deleteApplication: RequestHandler = async (req, res) => {
  try {
    const application = await applicationSchema.findByIdAndDelete(req.params.id);

    if(!application) return res.status(404).json({ message: "Application not found"})
    
    res.status(201).json({
      success: true,
      message: "Application deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const getApplication: RequestHandler = async (req, res) => {
  try {
    const application = await applicationSchema.find()
    res.status(200).json({
      success: true,
      data: application,
      message: "Applications retrieved successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export const getApplicationById: RequestHandler<IdParams> = async (req, res) => {
  try {
    const application = await applicationSchema.findById(req.params.id)
    if(!application) return res.status(404).json({ message: "Application not found"})
    res.status(200).json({
      success: true,
      data: application,
      message: "Application retrieved successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
export default {
  createApplication,
  updateApplication,
  deleteApplication,
  getApplication,
  getApplicationById
}