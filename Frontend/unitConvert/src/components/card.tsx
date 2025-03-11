interface CardProps {
  children?: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white dark:bg-zinc-800 shadow-sm">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
