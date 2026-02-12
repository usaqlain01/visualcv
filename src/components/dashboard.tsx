"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Github,
  GraduationCap,
  Award,
  BookOpen,
  Send,
  Bot,
  ExternalLink,
  Sparkles,
  Construction,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { SkillBar } from "@/components/skill-bar";
import { ExperienceCard } from "@/components/experience-card";
import { ChatBubble } from "@/components/chat-bubble";
import { useTheme } from "@/components/theme-provider";
import {
  personalInfo,
  skills,
  skillDistribution,
  experiences,
  education,
  certifications,
  courses,
  githubStats,
  type Experience,
} from "@/data/resume-data";

const chatMessages: { from: "bot" | "user"; text: string }[] = [
  {
    from: "bot",
    text: "Hi! I'm Usman's AI assistant. I can answer questions about his experience, technical skills, projects, and availability. Ask me anything!",
  },
  { from: "user", text: "What's his strongest technical area?" },
  {
    from: "bot",
    text: "Usman's deepest expertise is in Drupal and PHP — 12+ years of enterprise-level development including complex migrations, custom module architecture, and federal compliance work. He pairs that with strong DevOps and cloud infrastructure skills on AWS.",
  },
  { from: "user", text: "Is he open to new opportunities?" },
  {
    from: "bot",
    text: "Yes! Usman is exploring senior-level opportunities where he can leverage his full-stack expertise alongside his growing AI/ML capabilities. He holds an active US security clearance, which makes him well-suited for government and defense sector roles.",
  },
];

export function Dashboard() {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  const [detailExp, setDetailExp] = useState<Experience | null>(null);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const otherExperiences = experiences.slice(1);

  return (
    <div className="bg-grid min-h-screen">

      {/* ═══════ BODY ═══════ */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ──── COL 1: Skills ──── */}
          <div className="space-y-5 fade-up delay-1">
            {/* Proficiencies */}
            <Card className="glow-card border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Core
                  Proficiencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {skills.map((s, i) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    delay={200 + i * 80}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Skill Distribution Pie */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Skill Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                        label={({ value }) => `${value}%`}
                        labelLine={false}
                      >
                        {skillDistribution.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "11px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {skillDistribution.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center gap-2 text-[10px]"
                    >
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="text-muted-foreground font-mono">
                        {s.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* GitHub */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                    <Github className="w-3.5 h-3.5" /> GitHub Activity
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-mono"
                  >
                    {githubStats.contributions} contributions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Image
                  src="/images/github-contributions.png"
                  alt="GitHub contribution graph"
                  width={600}
                  height={120}
                  className="w-full rounded-md opacity-90"
                />
                <p className="text-[10px] text-muted-foreground mt-2 font-mono text-center">
                  {githubStats.period}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ──── COL 2: Experience ──── */}
          <div className="space-y-5 fade-up delay-2">
            {/* Current Position */}
            <Card className="glow-card border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-500" />{" "}
                  Current Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ExperienceCard exp={experiences[0]} />
              </CardContent>
            </Card>

            {/* Career History Selector */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Career History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {otherExperiences.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setDetailExp(exp)}
                      className={`text-left p-2.5 rounded-lg border transition-all text-xs hover:border-emerald-500/40 hover:bg-emerald-500/5 ${
                        detailExp?.id === exp.id
                          ? "border-emerald-500/50 bg-emerald-500/10"
                          : "border-border/50 bg-muted/20"
                      }`}
                    >
                      <span className="font-mono font-semibold text-foreground text-[11px] block truncate">
                        {exp.shortName}
                      </span>
                      <span className="text-[9px] text-muted-foreground block mt-0.5">
                        {exp.period}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detail View */}
            <Card className="border-border/50 bg-card/50 backdrop-blur min-h-[260px]">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  {detailExp ? detailExp.company : "Select a Role Above"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {detailExp ? (
                  <ExperienceCard exp={detailExp} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Briefcase className="w-8 h-8 mb-3 opacity-30" />
                    <p className="text-xs font-mono">
                      Click a role to view details
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ──── COL 3: AI Chat + Contact ──── */}
          <div className="space-y-5 fade-up delay-3">
            {/* AI Chat */}
            <Card
              className="glow-card border-border/50 bg-card/50 backdrop-blur flex flex-col"
              style={{ minHeight: "520px" }}
            >
              <CardHeader className="pb-2 shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-emerald-500" /> Ask My AI
                    Assistant
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="text-[9px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-400 gap-1"
                  >
                    <Construction className="w-3 h-3" /> Coming Soon
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto custom-scroll space-y-3 pr-1 mb-3">
                  {chatMessages.map((msg, i) => (
                    <ChatBubble key={i} from={msg.from} text={msg.text} />
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="shrink-0 relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about Usman's experience..."
                    disabled
                    className="w-full h-9 rounded-lg border border-border/50 bg-muted/30 px-3 pr-10 text-xs font-mono placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <Button
                    size="sm"
                    disabled
                    className="absolute right-1 top-1 h-7 w-7 p-0 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-[9px] text-muted-foreground/60 text-center mt-1.5 font-mono">
                  AI assistant under development — live demo coming soon
                </p>
              </CardContent>
            </Card>

            {/* Contact & Links */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  Contact & Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {[
                    {
                      icon: Mail,
                      label: personalInfo.email,
                      href: `mailto:${personalInfo.email}`,
                      color: "text-rose-500",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn Profile",
                      href: `https://${personalInfo.linkedin}`,
                      color: "text-sky-500",
                    },
                    {
                      icon: Github,
                      label: "GitHub Profile",
                      href: `https://${personalInfo.github}`,
                      color: "text-foreground",
                    },
                    {
                      icon: Phone,
                      label: personalInfo.phone,
                      href: `tel:${personalInfo.phone}`,
                      color: "text-emerald-500",
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-lg border border-border/30 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
                    >
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-xs text-foreground/70 group-hover:text-foreground transition-colors font-mono truncate">
                        {item.label}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur mt-4">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education & Certs */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />{" "}
                Education & Certifications
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-border/30 bg-muted/10">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-sky-500" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {education.degree}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {education.school} — {education.year}
                      </p>
                    </div>
                  </div>
                </div>
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-3 rounded-lg border border-border/30 bg-muted/10"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          {cert.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono">
                          {cert.issuer} — {cert.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Training & Courses */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-violet-500" /> AI
                Training & Courses
              </h3>
              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.name}
                    className="p-3 rounded-lg border border-border/30 bg-muted/10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            {course.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-mono">
                            {course.provider}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[9px] font-mono shrink-0 border-violet-500/30 text-violet-600 dark:text-violet-400"
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-5 opacity-50" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] text-muted-foreground font-mono">
              © {new Date().getFullYear()} Usman Saqlain — Built with Next.js,
              React, Tailwind CSS & shadcn/ui
            </p>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to opportunities
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
