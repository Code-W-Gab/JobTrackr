import { useState, useEffect } from "react";
import type { IApplication, createApplicationDTO, updateApplicationDTO } from "../types/applicationTypes";
import { createApplication, updateApplication, getApplications, deleteApplication } from "../service/applicationService";
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
  const handleCreateApplication = async (
    formData: createApplicationDTO,
    onClose: () => void
  ): Promise<void> => {
    const payload = {
      ...formData,
      companyName: formData.companyName?.trim(),
      jobTitle: formData.jobTitle?.trim(),
      jobURL: formData.jobURL?.trim(),
      location: formData.location?.trim(),
      salary: formData.salary?.trim(),
      notes: formData.notes?.trim() || "",
    };
  
    if (
      !payload.companyName ||
      !payload.jobTitle ||
      !payload.jobURL ||
      !payload.location ||
      !payload.dateApplied ||
      !payload.salary ||
      !payload.platform ||
      !payload.jobType ||
      !payload.locationType ||
      !payload.status
    ) {
      toast.error("Please fill all required fields");
      return;
    }
  
    try {
      await createApplication(payload);
      await fetchApplication();
      toast.success("Application created successfully!");
      onClose();
    } catch (error: any) {
      const message =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        "Failed to create application";
        
      console.error("Create application error:", error.response?.data);
      toast.error(message);
    }
  };

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
    } catch (error: any) {
      const message =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        "Failed to update application";

      console.error("Update application error:", error.response?.data);
      toast.error(message);
    }
  }

  // Handle Delete Application
  const handleDeleteApplication = async (id: string, onClose: () => void): Promise<void> => {
    try {
      await deleteApplication(id)
      await fetchApplication()
      toast.success("Application deleted successfully!")
      onClose()
    } catch (error) {
      toast.error("Failed to updated application")
      console.log(error)
    }
  }
  return { loading, error, applications, fetchApplication, handleCreateApplication, handleUpdateApplication, handleDeleteApplication }
}