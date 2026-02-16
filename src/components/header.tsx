"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Moon,
  Sun,
  Download,
  Briefcase,
  FolderGit2,
  FlaskConical,
  Shield,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { personalInfo } from "@/data/resume-data";

interface NavLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  download?: string;
}

const navLinks: NavLink[] = [
  { href: "/resume.pdf", label: "Resume", icon: Download, download: "UsmanSaqlain_Resume.pdf" },
  { href: "/", label: "Portfolio", icon: Briefcase },
  { href: "/ai-labs", label: "AI Labs", icon: FlaskConical },
  { href: "/dash-demo", label: "Dash Demo", icon: FlaskConical },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const pathname = usePathname();

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo + Title */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/images/profile.png"
                alt="Usman Saqlain"
                width={36}
                height={36}
                className="rounded-lg object-cover ring-2 ring-emerald-500/40"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <h1 className="font-mono text-sm font-bold tracking-tight">
                {personalInfo.title}
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono">
                {personalInfo.subtitle}
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = link.href === pathname;
              const Icon = link.icon;

              if (link.download) {
                return (
                    <a key={link.label} href={link.href} download={link.download}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-mono hidden sm:flex gap-1.5"
                    >
                      <Icon className="w-3.5 h-3.5" /> {link.label}
                    </Button>
                  </a>
                );
              }

              return (
                <Link key={link.label} href={link.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-xs font-mono hidden sm:flex gap-1.5 ${
                      isActive
                        ? "text-emerald-500 bg-emerald-500/10"
                        : ""
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {link.label}
                  </Button>
                </Link>
              );
            })}

            <Separator
              orientation="vertical"
              className="h-5 mx-1 hidden sm:block"
            />

            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-muted-foreground" />
              <Switch
                checked={dark}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
                className="data-[state=checked]:bg-emerald-600 scale-75"
              />
              <Moon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="border-t border-border/30 bg-emerald-500/[0.03]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs text-foreground/70 leading-relaxed max-w-3xl">
              {personalInfo.tagline}
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <Badge
                variant="outline"
                className="text-[10px] font-mono border-emerald-500/30 text-emerald-600 dark:text-emerald-400 gap-1"
              >
                <Shield className="w-3 h-3" /> Active Security Clearance
              </Badge>
              <Badge
                variant="outline"
                className="text-[10px] font-mono border-sky-500/30 text-sky-600 dark:text-sky-400 gap-1"
              >
                <MapPin className="w-3 h-3" /> {personalInfo.location}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}