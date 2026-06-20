export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString)
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }
  
  // Format as: Jan 15, 2024
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}

export const formatDateShort = (dateString: string | Date): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }
  
  // Format as: 01/15/2024
  return date.toLocaleDateString("en-US")
}

export const formatDateTime = (dateString: string | Date): string => {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }
  
  // Format as: Jan 15, 2024 2:30 PM
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

export const formatDateForInput = (dateString: string | undefined): string => {
  if(!dateString) return ""
  
  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    return ""
  }
  
  // Returns YYYY-MM-DD format for <input type="date">
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  
  return `${year}-${month}-${day}`
}