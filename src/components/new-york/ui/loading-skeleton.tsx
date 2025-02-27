import React from 'react';
import { Skeleton } from "@/src/components/new-york/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/new-york/ui/card';

interface LoadingSkeletonProps {
  title?: string;
  fields?: number;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
}

/**
 * A reusable loading skeleton component for form fields
 */
export function LoadingSkeleton({ 
  title = "Loading...", 
  fields = 3, 
  className = "",
  variant = 'default'
}: LoadingSkeletonProps) {
  return (
    <Card className={`mb-6 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <LoadingSpinner />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {Array.from({ length: fields }).map((_, index) => (
            <SkeletonFormField 
              key={index} 
              variation={(index % 3) as 0 | 1 | 2} 
              variant={variant} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Animated loading spinner with pulse effect
 */
export function LoadingSpinner({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: "h-5 w-5",
    default: "h-7 w-7", 
    large: "h-9 w-9"
  };
  
  const innerSizeClasses = {
    small: "h-3 w-3",
    default: "h-5 w-5",
    large: "h-7 w-7"
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
      <div className="absolute h-full w-full animate-ping rounded-full bg-primary/40 opacity-75"></div>
      <div className={`relative rounded-full bg-primary ${innerSizeClasses[size]}`}></div>
    </div>
  );
}

/**
 * Form field skeleton with different variations
 */
function SkeletonFormField({ 
  variation = 0, 
  variant = 'default' 
}: { 
  variation?: 0 | 1 | 2;
  variant?: 'default' | 'compact' | 'detailed';
}) {
  // For compact variant, simplify all to just basic fields
  if (variant === 'compact') {
    return (
      <div className="space-y-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  // For detailed variant, make everything more elaborate
  if (variant === 'detailed') {
    switch (variation) {
      case 0:
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-12 w-full rounded-md" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-3 w-3/4" />
          </div>
        );
      case 2:
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center space-x-3 mt-3">
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="h-4 w-52" />
            </div>
            <div className="flex items-center space-x-3 mt-2">
              <Skeleton className="h-6 w-6 rounded-md" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        );
    }
  }

  // Default variant
  switch (variation) {
    // Standard input field
    case 0:
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      );
    
    // Button group or dropdown
    case 1:
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex flex-row space-x-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      );
    
    // Checkbox or radio option
    case 2:
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <div className="flex items-center space-x-2 mt-3">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-3 w-40" />
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Skeleton className="h-5 w-5 rounded-md" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>
      );
    
    default:
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
  }
}
