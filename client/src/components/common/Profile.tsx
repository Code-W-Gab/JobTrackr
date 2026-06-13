interface initialProps {
  initials: string
}

export default function Profile({initials}: initialProps) {
  return(
    <main className="text-white text-[13px] font-semibold bg-indigo-600 py-1 px-1.5 rounded-full">
      <p>{initials}</p>
    </main>
  )
}