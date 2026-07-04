export default function Status({ status, className }: { status: string; className?: string }) {
  const statusConfig: Record<string, { badge: string; dot: string; text: string }> = {
    Wishlist: { badge: "bg-gray-100", dot: "bg-gray-500", text: "text-gray-500" },
    Applied: { badge: "bg-blue-50", dot: "bg-blue-500", text: "text-blue-500" },
    Assessment: { badge: "bg-violet-50", dot: "bg-violet-500", text: "text-violet-500" },
    Interview: { badge: "bg-amber-50", dot: "bg-amber-500", text: "text-amber-500" },
    "Final Interview": { badge: "bg-indigo-50", dot: "bg-indigo-500", text: "text-indigo-500" },
    Offer: { badge: "bg-green-50", dot: "bg-green-500", text: "text-green-500" },
    Rejected: { badge: "bg-red-50", dot: "bg-red-500", text: "text-red-500" },
    Accepted: { badge: "bg-teal-50", dot: "bg-teal-500", text: "text-teal-500" },
  }

  const config = statusConfig[status] ?? statusConfig.Applied

  return (
    <div className={`${className} ${config.badge}`}>
      <div className={`size-1.5 rounded-full ${config.dot}`}></div>
      <span className={`text-[11px] ${config.text}`}>{status}</span>
    </div>
  )
}