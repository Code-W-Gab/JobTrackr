import { useState, useEffect } from "react";
import type { IApplication } from "../types/applicationTypes";
import { getApplications } from "../service/applicationService";

export const useApplications = () => {
  const [applications, setApplications] = useState<IApplication[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchApplication = async () => {
    try {
      setLoading(true)
      const response = await getApplications()
      setApplications(response.data?.data || [])
      setError(null)
    } catch (error) {
      setError("Failed to fetch applications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [])


  return { applications, loading, error, fetchApplication }
}

