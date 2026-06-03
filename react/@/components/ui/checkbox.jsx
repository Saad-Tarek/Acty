"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "relume-icons";
import { cn } from "@/lib/utils";
function Checkbox({ className, ...props }) {
    return (<CheckboxPrimitive.Root data-slot="checkbox" className={cn("size-[1.125rem] rounded-checkbox transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50", "border border-neutral-darkest-15 bg-transparent hover:bg-neutral-darkest-5 data-[state=checked]:bg-neutral-darkest data-[state=checked]:text-white alternate:border-white-20 alternate:hover:bg-white-10 alternate:data-[state=checked]:bg-white alternate:data-[state=checked]:text-neutral-darkest", className)} {...props}>
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
        <Check className="size-4"/>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>);
}
export { Checkbox };
