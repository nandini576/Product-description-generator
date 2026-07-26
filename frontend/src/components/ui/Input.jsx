function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  error,
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="font-medium text-xs md:text-sm text-gray-700 dark:text-gray-300">{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-xl px-4 py-2.5 text-sm outline-none transition bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:border-green-600 focus:ring-1 focus:ring-green-600 ${className}`}
      />

      {error && (
        <span className="text-red-500 text-xs font-medium">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;