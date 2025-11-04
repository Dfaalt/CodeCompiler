// import CodeEditorComponent from "@uiw/react-textarea-code-editor";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Download } from "lucide-react";
import Editor from "@monaco-editor/react";
import { useMonacoFeatures } from "@/hooks/useMonacoFeatures";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onSave?: () => void;
  onReset?: () => void;
  onRun?: () => void;
  isRunning?: boolean;
}

const languageMap: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  cpp: "cpp",
  java: "java",
  html: "html",
};

const CodeEditor = ({
  value,
  onChange,
  language,
  onSave,
  onReset,
  onRun,
  isRunning,
}: CodeEditorProps) => {
  const monacoConfig = useMonacoFeatures();
  return (
    <div className="h-full flex flex-col">
      <div className="bg-secondary px-3 sm:px-4 py-2 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <span className="ml-2 sm:ml-4 text-sm text-muted-foreground font-mono">
            main.{languageMap[language] || "js"}
          </span>
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
      <Editor
        height="100%"
        value={value}
        onChange={(v) => onChange(v || "")}
        defaultLanguage={languageMap[language] || "javascript"}
        onMount={monacoConfig}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontFamily: "JetBrains Mono, Fira Code, monospace",
          fontSize: 14,
          smoothScrolling: true,
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
