import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string
  className?: string
  children?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
  children
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-xl border border-dashed border-border/80 bg-card/40 backdrop-blur-xs",
      className
    )}>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary mb-3.5">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-foreground font-display tracking-tight mb-1">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground max-w-sm leading-relaxed mb-5">
        {description}
      </p>
      {actionLabel && (
        actionHref ? (
          <Button asChild variant="default" size="sm">
            <a href={actionHref}>{actionLabel}</a>
          </Button>
        ) : (
          <Button variant="default" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )
      )}
      {children}
    </div>
  )
}
