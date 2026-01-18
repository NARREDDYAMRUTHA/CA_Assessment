import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  FINANCE: "bg-category-finance",
  TECH: "bg-category-tech",
  TRAVEL: "bg-category-travel",
  LIFESTYLE: "bg-category-lifestyle",
  FOOD: "bg-category-food",
  HEALTH: "bg-category-health",
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const colorClass = categoryColors[category.toUpperCase()] || "bg-primary";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium text-primary-foreground",
        colorClass,
        className
      )}
    >
      {category}
    </span>
  );
}
