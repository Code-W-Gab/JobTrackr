import { Request, Response } from "express";
import applicationSchema from "../models/applicationSchema";
import { createApplicationDTO, updateApplication, IdParams } from "../types/applicationTypes";

const applicationController = {
  async createApplication (req: Request<{}, {}, createApplicationDTO>, res: Response){
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
  },

  async updateApplication (req: Request<IdParams, {}, updateApplication>, res: Response){
    try {
      const id = req.params.id
      const application = await applicationSchema.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!application) return res.status(404).json({ message: "Application not found!"})
      res.status(200).json({
        success: true,
        data: application,
        message: "Application update successfully"
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }
  }
}