import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({ children, className }: ContentBlockProps) {
  return (
    <div className={cn("bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden h-full w-full", className)}>
      {children}
    </div>
  )
}
