# Shadcn/UI Best Practices for Createconomy

Component composition patterns, theming conventions, and accessibility guidelines for Shadcn UI components in this monorepo.

## UI Package Structure

### Component Location

All Shadcn components are in `packages/ui/src/`:

```
packages/ui/src/
├── button.tsx
├── card.tsx
├── input.tsx
├── dialog.tsx
├── dropdown-menu.tsx
├── select.tsx
├── table.tsx
├── toast.tsx
├── form/
│   ├── use-form.ts
│   └── index.ts
└── index.ts          # Export all components
```

### Core Utilities

```typescript
// packages/ui/src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Always use `cn()` for conditional classes**:

```tsx
// ✅ GOOD: Uses cn utility
<button className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  className
)} />

// ❌ BAD: Manual class handling
<button className={`base-classes ${variant === "primary" ? "primary" : ""} ${className}`} />
```

## Component Patterns

### Composition Pattern

Shadcn uses compound components for flexibility:

```tsx
// Usage: Card component
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@createconomy/ui";

<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Brief description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Variant Pattern

Use class-variance-authority for variants:

```tsx
// packages/ui/src/button.tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
```

## Adding New Components

### Using Shadcn CLI

```bash
# From app directory
npx shadcn@latest add <component>

# Add to specific app
cd apps/marketplace
npx shadcn@latest add alert-dialog

# Add to UI package (recommended for shared components)
cd packages/ui
npx shadcn@latest add accordion
```

### Manual Component Creation

1. **Create file** in `packages/ui/src/`
2. **Follow patterns**:
   - Use `React.forwardRef` for DOM components
   - Use `cn()` utility for classes
   - Export TypeScript types
   - Add to `index.ts`

```tsx
// packages/ui/src/badge.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@createconomy/ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

3. **Export from index**:
```typescript
// packages/ui/src/index.ts
export * from "./badge";
```

## Theming

### CSS Variables Theme

Theme is defined in each app's `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

### Using Theme Variables

```tsx
// Use hsl() with CSS variables
<div className="bg-background text-foreground border-border">
  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Click me
  </Button>
</div>
```

## Form Patterns

### Using react-hook-form with Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@createconomy/ui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@createconomy/ui/form";
import { Input } from "@createconomy/ui/input";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
});

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Accessibility Guidelines

### Keyboard Navigation

All interactive components must be keyboard accessible:

```tsx
// ✅ GOOD: Proper keyboard handling
<button
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Action
</button>
```

### ARIA Attributes

```tsx
// Proper ARIA labels
<button aria-label="Close dialog" onClick={onClose}>
  <X />
</button>

// Descriptive labels for inputs
<Input
  id="email"
  type="email"
  aria-label="Email address"
  aria-describedby="email-description"
/>
<p id="email-description">We'll never share your email.</p>
```

### Focus Management

```tsx
import * as React from "react";

function Modal({ isOpen, onClose }) {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
```

## Best Practices Summary

### DO

- ✅ Use `cn()` utility for all conditional classes
- ✅ Use `React.forwardRef` for DOM components
- ✅ Export TypeScript types for all props
- ✅ Follow compound component pattern
- ✅ Use class-variance-authority for variants
- ✅ Include proper ARIA attributes
- ✅ Ensure keyboard accessibility
- ✅ Add loading and error states
- ✅ Use semantic HTML elements

### DON'T

- ❌ Use inline styles (use Tailwind classes)
- ❌ Hardcode variant classes (use `cva`)
- ❌ Forget to export types
- ❌ Ignore accessibility
- ❌ Use `any` types
- ❌ Skip error handling

## Resources

- **UI Package**: `packages/ui/`
- **Tailwind Config**: `apps/*/tailwind.config.ts`
- **Globals CSS**: `apps/*/app/globals.css`
- **Shadcn Docs**: https://ui.shadcn.com
- **CVA Docs**: https://cva.style/docs
- **Radix Docs**: https://www.radix-ui.com/docs/primitives
