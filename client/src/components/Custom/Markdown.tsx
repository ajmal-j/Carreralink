import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
  className?: string;
}

export default function Markdown({ children, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={cn("space-y-3", className)}
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => (
          <a
            className="text-foreground/60 underline"
            target="_blank"
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
