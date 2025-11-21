import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-green-600 active:bg-green-700',
        destructive: 'bg-red-600 active:bg-red-700',
        outline: 'border-2 border-green-600 bg-transparent active:bg-green-50',
        secondary: 'bg-gray-600 active:bg-gray-700',
        ghost: 'active:bg-gray-100',
      },
      size: {
        default: 'h-12 px-6',
        sm: 'h-10 px-4',
        lg: 'h-14 px-8',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'text-base font-semibold',
  {
    variants: {
      variant: {
        default: 'text-white',
        destructive: 'text-white',
        outline: 'text-green-600',
        secondary: 'text-white',
        ghost: 'text-gray-900',
      },
      size: {
        default: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg',
        icon: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  title?: string;
  children?: React.ReactNode;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, title, children, ...props }, ref) => {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {children || (
        <Text className={cn(buttonTextVariants({ variant, size }))}>
          {title}
        </Text>
      )}
    </Pressable>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
