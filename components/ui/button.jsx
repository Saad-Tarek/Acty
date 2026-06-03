import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-3 rounded-button whitespace-nowrap transition-all duration-200 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-torea-bay font-medium text-scheme-btn-text shadow-[inset_0_-2px_1px_0_var(--color-neutral-darkest-20),inset_0_32px_24px_0_var(--color-white-5),inset_0_1px_1px_1px_var(--color-white-20),inset_0_0_0_1px_var(--color-neutral-darkest-15),0_1px_2px_0_var(--color-neutral-darkest-15)] hover:-translate-y-0.5 hover:bg-torea-bay-dark hover:shadow-[inset_0_-2px_1px_0_var(--color-neutral-darkest-20),inset_0_32px_24px_0_var(--color-white-5),inset_0_1px_1px_1px_var(--color-white-20),inset_0_0_0_1px_var(--color-neutral-darkest-15),0_2px_4px_0_var(--color-neutral-darkest-15)] btn-light:bg-white btn-light:text-neutral-darkest btn-light:hover:bg-neutral-lighter",
            alternate: "bg-white font-medium text-neutral-darkest shadow-[inset_0_-2px_1px_0_var(--color-neutral-darkest-20),inset_0_32px_24px_0_var(--color-white-5),inset_0_1px_1px_1px_var(--color-white-20),inset_0_0_0_1px_var(--color-neutral-darkest-15),0_1px_2px_0_var(--color-neutral-darkest-15)] hover:-translate-y-0.5 hover:bg-neutral-lighter hover:shadow-[inset_0_-2px_1px_0_var(--color-neutral-darkest-20),inset_0_32px_24px_0_var(--color-white-5),inset_0_1px_1px_1px_var(--color-white-20),inset_0_0_0_1px_var(--color-neutral-darkest-15),0_2px_4px_0_var(--color-neutral-darkest-15)]",
            secondary: "bg-neutral-darkest-5 font-medium shadow-[0_1px_2px_0_var(--color-neutral-darkest-5),inset_0_-2px_1px_0_var(--color-neutral-darkest-5),inset_0_0_0_1px_var(--color-neutral-darkest-5)] hover:bg-neutral-darkest-15 alternate:bg-white-10 alternate:shadow-[0_1px_2px_0_var(--color-neutral-darkest-5),inset_0_-2px_1px_0_var(--color-neutral-darkest-5),inset_0_0_0_1px_var(--color-white-10)] alternate:hover:bg-white-20",
            "secondary-alt": "bg-white-10 font-medium text-white shadow-[0_1px_2px_0_var(--color-neutral-darkest-5),inset_0_-2px_1px_0_var(--color-neutral-darkest-5),inset_0_0_0_1px_var(--color-white-10)] hover:bg-white-20",
            link: "gap-2 text-scheme-text",
            "link-alt": "gap-2 text-white",
            ghost: "hover:bg-neutral-darkest hover:text-white",
            none: "",
        },
        size: {
            default: "px-6 py-3",
            sm: "px-5 py-2",
            link: "p-0",
            icon: "size-10",
            none: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function Button({ className, variant, size, asChild = false, iconLeft, iconRight, children, ...props }) {
    const Comp = asChild ? Slot : "button";
    return (<Comp data-slot="button" data-variant={variant || "default"} className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {iconLeft && iconLeft}
      <Slottable>{children}</Slottable>
      {iconRight && iconRight}
    </Comp>);
}
export { Button, buttonVariants };
