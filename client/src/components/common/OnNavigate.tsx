import { Link, useNavigate } from "react-router-dom";
import type { MouseEvent, ReactNode } from "react";

interface OnNavigateProps {
  to?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  replace?: boolean;
}

export default function OnNavigate({
  to,
  children,
  onClick,
  className,
  replace = false,
}: OnNavigateProps) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (onClick) onClick();

    if (to) {
      event.preventDefault();
      navigate(to, { replace });
    }
  };

  if (!to) {
    return (
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}