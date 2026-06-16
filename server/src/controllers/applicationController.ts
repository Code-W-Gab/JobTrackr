import applicationSchema from "../models/applicationSchema";
import { createApplicationDTO, updateApplicationDTO, IdParams } from "../types/applicationTypes";
import { RequestHandler } from "express";

export const createApplication: RequestHandler<{}, {}, createApplicationDTO> = async (req, res) => {
  try {
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

export const updateApplication: RequestHandler = async (req, res) => {
  try {
    const application = await applicationSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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
      message: "Application retrieve successfully"
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
  getApplication
}