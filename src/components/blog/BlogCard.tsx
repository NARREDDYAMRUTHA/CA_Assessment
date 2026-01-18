import { format } from "date-fns";
import { CategoryBadge } from "./CategoryBadge";
import type { Blog } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
  const readTime = Math.ceil(blog.content.length / 1000);

  return (
    <article
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-lg overflow-hidden transition-all duration-200",
        "hover:shadow-md",
        isSelected && "ring-2 ring-primary shadow-md"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
          {blog.category.map((cat) => (
            <CategoryBadge key={cat} category={cat} />
          ))}
        </div>
      </div>
      <div className="p-4 bg-card">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {blog.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <time dateTime={blog.date}>
            {format(new Date(blog.date), "MMM d, yyyy")}
          </time>
          <span>{readTime} min read</span>
        </div>
      </div>
    </article>
  );
}
