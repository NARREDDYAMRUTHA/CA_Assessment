import { useState } from "react";
import { Header } from "@/components/blog/Header";
import { BlogList } from "@/components/blog/BlogList";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { CreateBlogDialog } from "@/components/blog/CreateBlogDialog";
import { useBlogs } from "@/hooks/useBlogs";

const Index = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const { data: blogs } = useBlogs();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Blog List */}
        <aside className="w-full md:w-[380px] lg:w-[420px] border-r border-border bg-card flex flex-col shrink-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Latest Stories</h2>
              <span className="text-sm text-muted-foreground">
                {blogs?.length || 0} articles
              </span>
            </div>
            <CreateBlogDialog />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            <BlogList 
              selectedBlogId={selectedBlogId}
              onSelectBlog={setSelectedBlogId}
            />
          </div>
        </aside>

        {/* Right Panel - Blog Detail */}
        <main className="hidden md:flex flex-1 overflow-y-auto p-8 scrollbar-thin">
          <div className="w-full max-w-4xl mx-auto">
            <BlogDetail blogId={selectedBlogId} />
          </div>
        </main>
      </div>

      {/* Mobile Blog Detail Overlay */}
      {selectedBlogId && (
        <div className="fixed inset-0 bg-background z-50 md:hidden overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-4">
            <button
              onClick={() => setSelectedBlogId(null)}
              className="text-sm text-primary font-medium hover:underline"
            >
              ← Back to Stories
            </button>
          </div>
          <div className="p-4">
            <BlogDetail blogId={selectedBlogId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
