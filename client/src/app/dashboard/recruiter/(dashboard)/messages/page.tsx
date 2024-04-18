import { MessageSquareText } from "lucide-react";

export default function Messages() {
  return (
    <div className="flex items-center justify-center gap-2 py-5 text-foreground/60">
      <MessageSquareText />
      <span>Click on chat&apos;s to view message&apos;s</span>
    </div>
  );
}
