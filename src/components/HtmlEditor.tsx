import { useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import type { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Download } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type TabKey = keyof typeof langMap;

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
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="bg-secondary border-border flex items-center justify-between gap-2 border-b px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {onSave && (
            <Button
              onClick={onSave}
              variant="secondary"
              size="sm"
              className="hover:text-accent gap-1 sm:gap-2"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden cursor-pointer sm:inline">Save</span>
            </Button>
          )}
          {onReset && (
            <Button
              onClick={onReset}
              variant="secondary"
              size="sm"
              className="hover:text-accent gap-1 sm:gap-2"
            >
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden cursor-pointer sm:inline">Reset</span>
            </Button>
          )}
          {onRun && (
            <Button
              onClick={onRun}
              disabled={isRunning}
              size="sm"
              className="bg-success hover:bg-success/90 text-background gap-1 sm:gap-2"
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden cursor-pointer sm:inline">Run</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabKey)}
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabsList className="bg-secondary border-border w-full justify-start rounded-none border-b px-4">
          <TabsTrigger
            value="html"
            className="dark:data-[state=active]:bg-background cursor-pointer font-mono text-xs text-orange-500 data-[state=active]:text-orange-500 sm:text-sm dark:text-orange-500 dark:data-[state=active]:text-orange-500"
          >
            index.html
          </TabsTrigger>
          <TabsTrigger
            value="css"
            className="dark:data-[state=active]:bg-background cursor-pointer font-mono text-xs text-blue-500 data-[state=active]:text-blue-500 sm:text-sm dark:text-blue-500 dark:data-[state=active]:text-blue-500"
          >
            styles.css
          </TabsTrigger>
          <TabsTrigger
            value="js"
            className="dark:data-[state=active]:bg-background cursor-pointer font-mono text-xs text-yellow-400 data-[state=active]:text-yellow-400 sm:text-sm dark:text-yellow-400 dark:data-[state=active]:text-yellow-400"
          >
            script.js
          </TabsTrigger>
        </TabsList>

        {/* Satu Monaco instance, bahasa & value mengikuti tab */}
        <div className="min-h-0 flex-1">
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
      </Tabs>
    </div>
  );
};

export default HtmlEditor;
