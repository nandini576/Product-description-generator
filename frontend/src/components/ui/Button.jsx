function Button({
  children,
  onClick,
  type = "button",
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
      ${sizes[size]}
      rounded-xl
      bg-[#2E7D32]
      hover:bg-[#1B5E20]
      text-white
      font-medium
      shadow-lg
      hover:shadow-xl
      transition-all
      duration-300
      hover:scale-105
      text-sm
      ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;