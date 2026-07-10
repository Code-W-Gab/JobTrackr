const avatarColors = [
  "bg-slate-600",
  "bg-indigo-600",
  "bg-black",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-sky-600",
  "bg-violet-600",
  "bg-slate-700",
];

export const getAvatarColor = (name: string, index?: number): string => {
  const seed = typeof index === "number" ? index : name.length;
  return avatarColors[seed % avatarColors.length];
};

export const getInitials = (name: string): string => {
  const names = name.split(' ')
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join('')
  return initials
}