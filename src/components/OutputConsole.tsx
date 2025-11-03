import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Monitor, Smartphone, Tablet } from "lucide-react";
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

  return (
    <div className="h-full flex flex-col bg-output-bg">
      <div className="bg-secondary px-4 py-2 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-success" />
          <span className="text-sm text-muted-foreground font-mono">
            {isHtmlPreview ? "Preview" : "Output"}
          </span>
        </div>

        {isHtmlPreview && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("desktop")}
              className={cn(
                "h-8 w-8 p-0",
                previewMode === "desktop" && "bg-accent"
              )}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("tablet")}
              className={cn(
                "h-8 w-8 p-0",
                previewMode === "tablet" && "bg-accent"
              )}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode("mobile")}
              className={cn(
                "h-8 w-8 p-0",
                previewMode === "mobile" && "bg-accent"
              )}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      {isHtmlPreview ? (
        <div className="flex-1 w-full overflow-auto bg-muted/20 flex justify-center p-4">
          <iframe
            srcDoc={htmlContent}
            className={cn(
              "h-full border border-border bg-white rounded-lg shadow-lg transition-all duration-300",
              getPreviewWidth()
            )}
            title="HTML Preview"
            sandbox="allow-scripts"
          />
        </div>
      ) : (
        <ScrollArea className="flex-1 p-4">
          <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
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
