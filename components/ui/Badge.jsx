function Badge({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-emerald-100 text-emerald-800",
    secondary: "bg-slate-100 text-slate-800",
    outline: "border border-slate-300 text-slate-700 bg-transparent",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
