import { Bot } from "lucide-react";

interface ChatBubbleProps {
  from: "bot" | "user";
  text: string;
}

export function ChatBubble({ from, text }: ChatBubbleProps) {
  const isBot = from === "bot";

  return (
    <div
      className={`flex gap-2 ${isBot ? "items-start" : "items-start flex-row-reverse"}`}
    >
      {isBot && (
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-emerald-500" />
        </div>
      )}
      <div
        className={`rounded-xl px-3 py-2 max-w-[85%] text-xs leading-relaxed ${
          isBot
            ? "bg-muted/60 text-foreground/80"
            : "bg-emerald-500/15 text-foreground/80"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
