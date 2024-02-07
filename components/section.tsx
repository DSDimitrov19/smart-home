import { cn } from '@/utils/cn'

const Section = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return <div className={cn('container relative mx-auto px-10', className)}>{children}</div>
}

export default Section