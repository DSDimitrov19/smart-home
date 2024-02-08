import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'cva'

const buttonVariants = cva('justify-centers inline-flex items-center ', {
  variants: {
    variant: {
      default: 'bg-zinc-100 font-semibold text-black',
      soft: 'bg-zinc-100/20 font-semibold text-white',
      outline: 'border border-zinc-700 text-zinc-100',
      link: 'underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      md: 'h-8 px-4 text-sm',
      lg: 'h-10 px-5 py-6 md:py-2 md:px-8',
      icon: 'size-8 items-center justify-center rounded-lg',
    },
    rounded: {
      default: 'rounded-md',
      full: 'rounded-full',
      none: 'rounded-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    rounded: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
    
const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export default Button