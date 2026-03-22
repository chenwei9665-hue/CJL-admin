import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

export function PrimaryButton({ children, className = "", ...props }: Props) {
  return (
    <button
      className={`rounded-btn bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }: Props) {
  return (
    <button
      className={`rounded-btn border border-border bg-white px-6 py-3 text-sm font-semibold text-textPrimary transition hover:-translate-y-0.5 hover:shadow-card ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
