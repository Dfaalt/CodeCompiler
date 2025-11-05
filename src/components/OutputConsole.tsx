import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Terminal,
  Monitor,
  Smartphone,
  Tablet,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OutputConsoleProps {
  output: string;
  isRunning: boolean;
}

type PreviewMode = "desktop" | "mobile" | "tablet";

const OutputConsole = ({ output, isRunning }: OutputConsoleProps) => {
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const isHtmlPreview = output.startsWith("HTML_PREVIEW:");
  const htmlContent = isHtmlPreview ? output.replace("HTML_PREVIEW:", "") : "";

  const getPreviewWidth = () => {
    switch (previewMode) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  const openPreviewInNewTab = () => {
    if (!isHtmlPreview) return;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  return (
    <div className="bg-output-bg flex h-full flex-col">
      <div className="bg-secondary border-border flex items-center justify-between gap-2 border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="text-success h-4 w-4" />
          <span className="text-muted-foreground font-mono text-sm">
            {isHtmlPreview ? "Preview" : "Output"}
          </span>
        </div>

        {isHtmlPreview ? (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("desktop")}
              className={cn(
                "h-8 w-8 cursor-pointer p-0",
                previewMode === "desktop" && "bg-accent",
              )}
              title="Desktop Preview"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("tablet")}
              className={cn(
                "h-8 w-8 cursor-pointer p-0",
                previewMode === "tablet" && "bg-accent",
              )}
              title="Tablet Preview"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("mobile")}
              className={cn(
                "h-8 w-8 cursor-pointer p-0",
                previewMode === "mobile" && "bg-accent",
              )}
              title="Mobile Preview"
            >
              <Smartphone className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={openPreviewInNewTab}
              className="hover:text-accent ml-1 gap-1 sm:gap-2"
              title="Open Preview in New Tab"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden cursor-pointer sm:inline">Preview</span>
            </Button>
          </div>
        ) : null}
      </div>
      {isHtmlPreview ? (
        <div className="flex w-full flex-1 justify-center overflow-auto">
          <iframe
            srcDoc={htmlContent}
            className={cn(
              "h-full rounded-md border-none bg-white shadow-md",
              getPreviewWidth(),
            )}
            title="HTML Preview"
            sandbox="allow-scripts"
          />
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4">
          <pre className="text-foreground font-mono text-sm whitespace-pre-wrap">
            {isRunning ? (
              <span className="text-muted-foreground">Running code...</span>
            ) : (
              output || (
                <span className="text-muted-foreground">
                  Run your code to see output here
                </span>
              )
            )}
          </pre>
        </ScrollArea>
      )}
    </div>
  );
};

export default OutputConsole;
