import * as React from "react"
import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    aria-label="breadcrumb"
    className={cn(
      "flex items-center text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("hover:text-foreground transition-colors", className)}
    {...props}
  />
))
BreadcrumbLink.displayName = "BreadcrumbLink"

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink }