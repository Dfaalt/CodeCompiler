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
    <div className="flex h-full flex-col">
      <div className="bg-secondary border-border flex items-center justify-between gap-2 border-b px-3 py-2 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_2px_rgba(0,0,0,0.4)]"></div>
          <span className="text-muted-foreground ml-2 font-mono text-sm sm:ml-4">
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
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
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
              <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Reset</span>
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
