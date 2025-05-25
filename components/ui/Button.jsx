"use client";

function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default:
      "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800",
    outline:
      "border-2 border-emerald-600 text-emerald-600 bg-transparent hover:bg-emerald-50 active:bg-emerald-100",
    secondary:
      "bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400",
    ghost: "text-slate-600 hover:bg-slate-100 active:bg-slate-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}

export { Button };
