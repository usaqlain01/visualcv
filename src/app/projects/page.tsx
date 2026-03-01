// src/app/projects/page.tsx
import Link from "next/link";
import {
  ArrowLeft,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="bg-grid min-h-screen">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-mono gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-emerald-500" />
              <h1 className="font-mono text-sm font-bold tracking-tight">
                Projects
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-12">
        <div className="text-center">
          <FolderGit2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="font-mono text-lg font-semibold text-foreground mb-2">
            Projects
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Portfolio projects and case studies will be showcased here. Check back soon for updates.
          </p>
        </div>
      </main>
    </div>
  );
}
