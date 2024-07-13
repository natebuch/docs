import { AlertOctagon, AlertTriangle, Info, Star } from "lucide-react";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type CalloutProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "title" | "type" | "icon"
> & {
  title?: ReactNode;
  /**
   * @defaultValue info
   */
  type?: "tip" | "info" | "warn" | "help";
  icon?: ReactNode;
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, children, title, type = "info", icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "my-6 flex flex-row items-center gap-2 rounded-lg p-3 text-sm text-foreground",
          {
            tip: "bg-[#CEEFD0] dark:bg-background dark:border dark:border-[#CEEFD0]",
            info: "bg-[#B3D9FF] dark:bg-background dark:border dark:border-[#B3D9FF]",
            warn: "bg-[#FF9966] dark:bg-background dark:border dark:border-[#FF9966]",
            help: "bg-[#EBE9E6] dark:bg-background dark:border",
          }[type],
          className
        )}
        {...props}
      >
        {icon ??
          {
            tip: (
              <Star className="size-4 stroke-foreground dark:stroke-foreground text-card" />
            ),
            info: (
              <Info className="size-4 stroke-foreground dark:stroke-foreground text-card" />
            ),
            warn: (
              <AlertTriangle className="size-4 stroke-foreground dark:stroke-foreground text-card" />
            ),
            help: (
              <AlertOctagon className="size-4 stroke-foreground dark:stroke-foreground text-card" />
            ),
          }[type]}
        <div className="w-0 flex-1">
          {title ? (
            <div
              className={cn(
                "mb-2 font-medium",
                {
                  tip: "text-foreground dark:text-[#CEEFD0]",
                  info: "text-foreground dark:text-[#D1E8FF]",
                  warn: "text-foreground dark:text-[#FF9966]",
                  help: "text-foreground dark:text-[#EBE9E6]",
                }[type]
              )}
            >
              {title}
            </div>
          ) : null}
          <div className="prose-no-margin">{children}</div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";
