import { useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMonacoFeatures } from "@/hooks/useMonacoFeatures";

interface HtmlEditorProps {
  htmlContent: string;
  cssContent: string;
  jsContent: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onJsChange: (value: string) => void;
  onSave?: () => void;
  onReset?: () => void;
  onRun?: () => void;
  isRunning?: boolean;
}

const langMap = {
  html: "html",
  css: "css",
  js: "javascript",
} as const;

const HtmlEditor = ({
  htmlContent,
  cssContent,
  jsContent,
  onHtmlChange,
  onCssChange,
  onJsChange,
  onSave,
  onReset,
  onRun,
  isRunning,
}: HtmlEditorProps) => {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const monacoConfig: OnMount = useMonacoFeatures();

  // value & setter sesuai tab aktif
  const { value, onChange, filename } = useMemo(() => {
    if (activeTab === "html") {
      return {
        value: htmlContent,
        onChange: onHtmlChange,
        filename: "index.html",
      };
    }
    if (activeTab === "css") {
      return {
        value: cssContent,
        onChange: onCssChange,
        filename: "styles.css",
      };
    }
    return { value: jsContent, onChange: onJsChange, filename: "script.js" };
  }, [
    activeTab,
    htmlContent,
    cssContent,
    jsContent,
    onHtmlChange,
    onCssChange,
    onJsChange,
  ]);

  return (
    <div className="h-full flex flex-col">
      {/* Top bar */}
      <div className="bg-secondary px-3 sm:px-4 py-2 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-accent" />
          <div className="w-3 h-3 rounded-full bg-success" />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {onSave && (
            <Button
              onClick={onSave}
              variant="secondary"
              size="sm"
              className="gap-1 sm:gap-2"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          )}
          {onReset && (
            <Button
              onClick={onReset}
              variant="secondary"
              size="sm"
              className="gap-1 sm:gap-2"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          )}
          {onRun && (
            <Button
              onClick={onRun}
              disabled={isRunning}
              size="sm"
              className="gap-1 sm:gap-2 bg-success hover:bg-success/90 text-background"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Run</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as any)}
        className="flex-1 flex flex-col min-h-0"
      >
        <TabsList className="bg-secondary border-b border-border rounded-none w-full justify-start px-4">
          <TabsTrigger
            value="html"
            className="font-mono text-xs sm:text-sm text-orange-500 data-[state=active]:text-orange-500 dark:text-orange-500 dark:data-[state=active]:text-orange-500 dark:data-[state=active]:bg-background"
          >
            index.html
          </TabsTrigger>
          <TabsTrigger
            value="css"
            className="font-mono text-xs sm:text-sm text-blue-500 data-[state=active]:text-blue-500 dark:text-blue-500 dark:data-[state=active]:text-blue-500 dark:data-[state=active]:bg-background"
          >
            styles.css
          </TabsTrigger>
          <TabsTrigger
            value="js"
            className="font-mono text-xs sm:text-sm text-yellow-500 data-[state=active]:text-yellow-500 dark:text-yellow-500 dark:data-[state=active]:text-yellow-500 dark:data-[state=active]:bg-background"
          >
            script.js
          </TabsTrigger>
        </TabsList>

        {/* Satu Monaco instance, bahasa & value mengikuti tab */}
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            value={value}
            onChange={(v) => onChange(v || "")}
            defaultLanguage={langMap[activeTab]}
            path={filename} // bikin model per file (supaya per-file state/linting terpisah)
            onMount={monacoConfig} // auto-pair + auto-indent {} dari hook
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontFamily: "JetBrains Mono, Fira Code, monospace",
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true,
              smoothScrolling: true,
              // Opsional: sembunyikan indikator keyboard virtual
              // accessibilitySupport: "off",
            }}
          />
        </div>

        {/* Dummy TabsContent agar shadcn Tabs tetap senang, tapi editor dipakai shared */}
        {/* <TabsContent value="html" />
        <TabsContent value="css" />
        <TabsContent value="js" /> */}
      </Tabs>
    </div>
  );
};

export default HtmlEditor;
