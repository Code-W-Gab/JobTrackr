export default function Status({ status, className }: { status: string; className?: string }) {
  const statusConfig: Record<string, { badge: string; dot: string; text: string }> = {
    Wishlist: { 
      badge: "bg-gray-50 dark:bg-gray-900", 
      dot: "bg-gray-500 dark:bg-gray-300", 
      text: "text-gray-500 dark:text-gray-300" 
    },
    Applied: { 
      badge: "bg-blue-50 dark:bg-blue-900", 
      dot: "bg-blue-500 dark:bg-blue-300", 
      text: "text-blue-500 dark:text-blue-300" 
    },
    Assessment: { 
      badge: "bg-violet-50 dark:bg-violet-900", 
      dot: "bg-violet-500 dark:bg-violet-300", 
      text: "text-violet-500 dark:text-violet-300" 
    },
    Interview: { 
      badge: "bg-amber-50 dark:bg-amber-900", 
      dot: "bg-amber-500 dark:bg-amber-300", 
      text: "text-amber-500 dark:text-amber-300" 
    },
    "Final Interview": { 
      badge: "bg-indigo-50 dark:bg-indigo-900", 
      dot: "bg-indigo-500 dark:bg-indigo-300", 
      text: "text-indigo-500 dark:text-indigo-300" 
    },
    Offer: { 
      badge: "bg-green-50 dark:bg-green-900", 
      dot: "bg-green-500 dark:bg-green-300", 
      text: "text-green-500 dark:text-green-300" 
    },
    Rejected: { 
      badge: "bg-red-50 dark:bg-red-900", 
      dot: "bg-red-500 dark:bg-red-300", 
      text: "text-red-500 dark:text-red-300" 
    },
    Accepted: { 
      badge: "bg-teal-50 dark:bg-teal-900", 
      dot: "bg-teal-500 dark:bg-teal-300", 
      text: "text-teal-500 dark:text-teal-300" 
    }
  }

  const config = statusConfig[status] ?? statusConfig.Applied

  return (
    <div className={`${className} ${config.badge}`}>
      <div className={`size-1.5 rounded-full ${config.dot}`}></div>
      <span className={`text-[11px] ${config.text}`}>{status}</span>
    </div>
  )
}