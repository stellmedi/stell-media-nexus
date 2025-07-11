
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white hover:opacity-90 active:opacity-100 shadow-sm",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
        outline:
          "border-2 border-indigo-600 bg-white text-indigo-700 hover:bg-indigo-600 hover:text-white active:bg-indigo-700 shadow-sm",
        secondary:
          "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200",
        link: "text-indigo-600 underline-offset-4 hover:underline hover:text-indigo-800 font-medium",
        cta: "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 font-semibold shadow-md hover:shadow-lg",
        white: "bg-white text-indigo-700 hover:bg-gray-50 active:bg-gray-100 font-semibold shadow-md hover:shadow-lg border-2 border-gray-200",
      },
      size: {
        default: "min-h-10 px-4 py-2",
        sm: "min-h-9 rounded-md px-3",
        lg: "min-h-11 rounded-md px-8",
        xl: "min-h-12 rounded-md px-8 py-3 text-base",
        icon: "min-h-14 min-w-14 rounded-full shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, onTouchEnd, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Prevent unwanted scroll behavior
      e.stopPropagation();
      
      if (onClick) {
        onClick(e);
      }
    };
    
    const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
      // Prevent unwanted scroll on mobile touch events
      e.stopPropagation();
      
      if (onTouchEnd) {
        onTouchEnd(e);
      }
    };
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
