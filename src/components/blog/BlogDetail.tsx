import { format } from "date-fns";
import { useBlog } from "@/hooks/useBlogs";
import { CategoryBadge } from "./CategoryBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, Clock, AlertCircle } from "lucide-react";

interface BlogDetailProps {
  blogId: number | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useBlog(blogId);

  if (!blogId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <BookOpen className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
          Welcome to CA Monk Blog
        </h2>
        <p className="text-muted-foreground max-w-md">
          Select a story from the sidebar to begin reading.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 animate-fade-in">
        <Skeleton className="aspect-[21/9] w-full rounded-lg mb-8" />
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-10 w-3/4 mb-4" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Failed to load blog
        </h3>
        <p className="text-sm text-muted-foreground">
          Something went wrong while fetching this blog post
        </p>
      </div>
    );
  }

  if (!blog) return null;

  const readTime = Math.ceil(blog.content.length / 1000);

  return (
    <article className="animate-fade-in">
      <div className="relative aspect-[21/9] overflow-hidden rounded-lg mb-8">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.category.map((cat) => (
            <CategoryBadge key={cat} category={cat} />
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.date}>
              {format(new Date(blog.date), "MMMM d, yyyy")}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{readTime} min read</span>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-8 italic">
          {blog.description}
        </p>

        <div className="prose prose-lg max-w-none">
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="text-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
