import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-foreground">CA Monk</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Stories that matter</p>
        </div>
      </div>
    </header>
  );
}
