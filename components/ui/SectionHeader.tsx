import { ReactNode } from "react";

type Props = { title: string; subtitle?: string; center?: boolean; extra?: ReactNode };

export function SectionHeader({ title, subtitle, center = false, extra }: Props) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-textSecondary md:text-lg">{subtitle}</p> : null}
      {extra ? <div className="mt-4">{extra}</div> : null}
    </div>
  );
}
