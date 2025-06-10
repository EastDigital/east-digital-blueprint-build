
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const LiquidGlassTabs = TabsPrimitive.Root

const LiquidGlassTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
LiquidGlassTabsList.displayName = TabsPrimitive.List.displayName

const LiquidGlassTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-eastdigital-orange/20 data-[state=active]:text-eastdigital-orange data-[state=active]:border data-[state=active]:border-eastdigital-orange/30 data-[state=active]:shadow-lg data-[state=active]:shadow-eastdigital-orange/20 hover:bg-white/[0.05] hover:text-white backdrop-blur-xl relative overflow-hidden",
      className
    )}
    {...props}
  >
    {/* Glass shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full data-[state=active]:translate-x-full transition-transform duration-1000"></div>
    <span className="relative z-10">{props.children}</span>
  </TabsPrimitive.Trigger>
))
LiquidGlassTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const LiquidGlassTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6",
      className
    )}
    {...props}
  />
))
LiquidGlassTabsContent.displayName = TabsPrimitive.Content.displayName

export { LiquidGlassTabs, LiquidGlassTabsList, LiquidGlassTabsTrigger, LiquidGlassTabsContent }
