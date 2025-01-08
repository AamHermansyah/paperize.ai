import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
  className?: string;
};

export const FormError = ({
  message,
  className
}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className={cn('bg-destructive/15 rounded-md flex items-center gap-x-2 text-sm text-destructive p-3', className)}>
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};