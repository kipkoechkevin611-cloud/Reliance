import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "whatsapp" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
      primary: "bg-navy text-white hover:bg-navy-light focus:ring-navy",
      secondary: "bg-yellow text-navy hover:bg-yellow-dark focus:ring-yellow",
      whatsapp: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600",
      outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white focus:ring-navy",
    };

    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
