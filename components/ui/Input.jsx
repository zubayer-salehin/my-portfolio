"use client";

function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      className={`w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${className}`}
      {...props}
    />
  );
}

export { Input };
