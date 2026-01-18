import { useBlogs } from "@/hooks/useBlogs";
import { BlogCard } from "./BlogCard";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { AlertCircle } from "lucide-react";

interface BlogListProps {
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
  const { data: blogs, isLoading, error } = useBlogs();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Failed to load blogs
        </h3>
        <p className="text-sm text-muted-foreground">
          Make sure the JSON server is running on port 3001
        </p>
      </div>
    );
  }

  if (!blogs?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No blogs yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Create your first blog post to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isSelected={selectedBlogId === blog.id}
          onClick={() => onSelectBlog(blog.id)}
        />
      ))}
    </div>
  );
}
