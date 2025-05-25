"use client";

function Textarea({
  placeholder,
  value,
  onChange,
  name,
  rows = 4,
  required = false,
  className = "",
  ...props
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      rows={rows}
      required={required}
      className={`w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical ${className}`}
      {...props}
    />
  );
}

export { Textarea };
