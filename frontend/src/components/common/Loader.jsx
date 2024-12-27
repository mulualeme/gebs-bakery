import { Loader2 } from "lucide-react";

const Loader = ({ message, size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      {message && (
        <p className="text-center text-sm font-medium text-gray-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
