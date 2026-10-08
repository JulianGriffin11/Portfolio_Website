import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]",
  {
    variants: {
      variant: {
        primary:
          "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:border-[var(--accent)] hover:bg-[var(--accent)]",
        outline:
          "border-[var(--rule-strong)] bg-transparent text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        text: "min-h-6 rounded-none border-0 px-0 py-0 text-[var(--accent)] underline decoration-[var(--accent-soft)] underline-offset-4 hover:decoration-[var(--accent)]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

function buttonClassName({
  className,
  variant,
}: ButtonVariantProps & { className?: string }): string {
  return cn(buttonVariants({ variant }), className);
}

export { buttonClassName, buttonVariants };
