function Loader({ size = "md" }) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`animate-spin rounded-full border-gray-200 border-t-green-600 ${sizeClasses[size]}`}
      />
    </div>
  );
}

export default Loader;