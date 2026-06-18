import { useState, useEffect } from "react";
import type { IApplication, createApplicationDTO, updateApplicationDTO } from "../types/applicationTypes";
import { createApplication, updateApplication, getApplications } from "../service/applicationService";
import toast from "react-hot-toast";

export const useApplications = () => {
  const [applications, setApplications] = useState<IApplication[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Get/Retrieved Data
  const fetchApplication = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await getApplications()
      setApplications(response.data?.data || [])
      setError(null)
    } catch (error) {
      setError("Failed to fetch applications")
      if (error instanceof Error) {
        console.error("Error fetching applications:", error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [])

  // Handle Create Application
  const handleCreateApplication = async (formData: createApplicationDTO, onClose: () => void): Promise<void> => {
    if (!formData.companyName || !formData.jobTitle || !formData.jobURL || !formData.location || !formData.dateApplied || !formData.salary || !formData.platform || !formData.jobType || !formData.locationType || !formData.status) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      await createApplication(formData)
      await fetchApplication()
      toast.success("Application created successfully!")
      onClose()
    } catch (error) {
      toast.error("Failed to create application")
      console.log(error)
    }
  }

  // Handle Update Application
  const handleUpdateApplication = async (id: string, formData: updateApplicationDTO, onClose: () => void): Promise<void> => {
    if (!formData.companyName || !formData.jobTitle || !formData.jobURL || !formData.location || !formData.dateApplied || !formData.salary || !formData.platform || !formData.jobType || !formData.locationType || !formData.status) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      await updateApplication(id, formData)
      await fetchApplication()
      toast.success("Application updated successfully!")
      onClose()
    } catch (error) {
      toast.error("Failed to updated application")
      console.log(error)
    }
  }

  return { loading, error, applications, fetchApplication, handleCreateApplication, handleUpdateApplication }
}