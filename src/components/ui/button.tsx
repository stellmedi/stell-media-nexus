
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white hover:opacity-90 active:opacity-100",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-input bg-background text-white hover:bg-accent hover:text-white",
        secondary:
          "bg-indigo-100 text-white hover:bg-indigo-200 active:bg-indigo-300",
        ghost: "text-white hover:bg-indigo-50 hover:text-white active:bg-indigo-100",
        link: "text-white underline-offset-4 hover:underline",
        cta: "bg-white text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 font-semibold shadow-md hover:shadow-lg border-2 border-white",
        white: "bg-white text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100 font-semibold shadow-md hover:shadow-lg border-2 border-white",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
