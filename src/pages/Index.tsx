import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import HtmlEditor from "@/components/HtmlEditor";
import OutputConsole from "@/components/OutputConsole";
import LanguageSelector from "@/components/LanguageSelector";
import CodeTemplates from "@/components/CodeTemplates";
import ThemeToggle from "@/components/ThemeToggle";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import { toast } from "sonner";
import * as ts from "typescript";

const sampleCode = {
  javascript: `// JavaScript Example
console.log("Hello, World!");`,
  typescript: `// TypeScript Example
console.log("Hello, World!");`,
  python: `# Python Example
print("Hello, World!")`,
  cpp: `// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};

const sampleHtmlFiles = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML/CSS/JS Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <button class="button" onclick="handleClick()">Click Me</button>
        <p id="message"></p>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
  css: `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #0284c7 60%, #0369a1 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
}

h1 {
    color: #0c4a6e;
    margin-bottom: 20px;
}

.button {
    background: #0284c7;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

.button:hover {
    background: #0369a1;
}

#message {
    margin-top: 20px;
    font-size: 18px;
    color:  #0369a1;
    font-weight: bold;
}`,
  js: `function handleClick() {
    const message = document.getElementById('message');
    message.textContent = 'Button clicked! JavaScript is working!';
    console.log('Button was clicked!');
}`,
};

const Index = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(sampleCode.javascript);
  const [htmlContent, setHtmlContent] = useState(sampleHtmlFiles.html);
  const [cssContent, setCssContent] = useState(sampleHtmlFiles.css);
  const [jsContent, setJsContent] = useState(sampleHtmlFiles.js);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (newLanguage === "html") {
      setHtmlContent(sampleHtmlFiles.html);
      setCssContent(sampleHtmlFiles.css);
      setJsContent(sampleHtmlFiles.js);
      // Immediately trigger preview for HTML
      const combinedHtml = sampleHtmlFiles.html
        .replace(
          '<link rel="stylesheet" href="styles.css">',
          `<style>${sampleHtmlFiles.css}</style>`,
        )
        .replace(
          '<script src="script.js"></script>',
          `<script>${sampleHtmlFiles.js}</script>`,
        );
      setOutput(`HTML_PREVIEW:${combinedHtml}`);
    } else {
      setCode(sampleCode[newLanguage as keyof typeof sampleCode]);
      setOutput("");
    }
  };

  const handleReset = () => {
    if (language === "html") {
      setHtmlContent(sampleHtmlFiles.html);
      setCssContent(sampleHtmlFiles.css);
      setJsContent(sampleHtmlFiles.js);
      // Immediately trigger preview for HTML
      const combinedHtml = sampleHtmlFiles.html
        .replace(
          '<link rel="stylesheet" href="styles.css">',
          `<style>${sampleHtmlFiles.css}</style>`,
        )
        .replace(
          '<script src="script.js"></script>',
          `<script>${sampleHtmlFiles.js}</script>`,
        );
      setOutput(`HTML_PREVIEW:${combinedHtml}`);
    } else {
      setCode(sampleCode[language as keyof typeof sampleCode]);
      setOutput("");
    }
    toast.success("Code reset to default");
  };

  const handleSaveFile = () => {
    if (language === "html") {
      // Save all 3 files as a zip would be ideal, but for simplicity, save HTML with embedded CSS and JS
      const combinedHtml = htmlContent
        .replace("</head>", `<style>${cssContent}</style>\n</head>`)
        .replace("</body>", `<script>${jsContent}</script>\n</body>`);

      const blob = new Blob([combinedHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "index.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("HTML file saved (with embedded CSS and JS)");
    } else {
      const fileExtension = {
        javascript: "js",
        typescript: "ts",
        python: "py",
        cpp: "cpp",
        java: "java",
      }[language];

      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `main.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Code saved to file");
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      if (language === "javascript") {
        // Capture console.log output
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map((arg) => String(arg)).join(" "));
          originalLog(...args);
        };

        try {
          // eslint-disable-next-line no-eval
          eval(code);
          setOutput(
            logs.join("\n") || "Code executed successfully (no output)",
          );
        } catch (error) {
          setOutput(
            `Error: ${error instanceof Error ? error.message : String(error)}`,
          );
        } finally {
          console.log = originalLog;
        }
      } else if (language === "typescript") {
        // Strip TypeScript type annotations for simple execution
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map((arg) => String(arg)).join(" "));
          originalLog(...args);
        };

        try {
          const transpiled = ts.transpileModule(code, {
            compilerOptions: {
              target: ts.ScriptTarget.ES2020,
              module: ts.ModuleKind.ESNext, // atau ts.ModuleKind.CommonJS
              jsx: ts.JsxEmit.ReactJSX, // kalau nanti dukung TSX
              isolatedModules: true,
              esModuleInterop: true,
              removeComments: false,
            },
          }).outputText;

          // eslint-disable-next-line no-eval
          eval(transpiled);
          setOutput(
            logs.join("\n") || "Code executed successfully (no output)",
          );
        } catch (error) {
          setOutput(
            `Error: ${error instanceof Error ? error.message : String(error)}`,
          );
        } finally {
          console.log = originalLog;
        }
      } else if (language === "html") {
        // Combine HTML, CSS, and JS into a single preview
        const combinedHtml = htmlContent
          .replace(
            '<link rel="stylesheet" href="styles.css">',
            `<style>${cssContent}</style>`,
          )
          .replace(
            '<script src="script.js"></script>',
            `<script>${jsContent}</script>`,
          );
        setOutput(`HTML_PREVIEW:${combinedHtml}`);
      } else {
        setOutput(
          `Note: ${language.toUpperCase()} execution requires a backend service.\nThis demo currently only supports JavaScript, TypeScript, and HTML/CSS execution in the browser.\n\nTo enable ${language.toUpperCase()}, we would need to integrate with a code execution API (Coming Soon!).`,
        );
      }
    } catch (error) {
      setOutput(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsRunning(false);
    }
  };

  // Auto-preview for HTML/CSS/JS - updates live as you type
  useEffect(() => {
    if (language === "html") {
      const timer = setTimeout(() => {
        const combinedHtml = htmlContent
          .replace(
            '<link rel="stylesheet" href="styles.css">',
            `<style>${cssContent}</style>`,
          )
          .replace(
            '<script src="script.js"></script>',
            `<script>${jsContent}</script>`,
          );
        setOutput(`HTML_PREVIEW:${combinedHtml}`);
      }, 500); // Debounce 500ms to avoid too many updates

      return () => clearTimeout(timer);
    }
  }, [htmlContent, cssContent, jsContent, language]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter: Run code
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
      // Ctrl+S: Save file
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSaveFile();
      }
      // Ctrl+R: Reset
      if (e.ctrlKey && e.key === "r") {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, language]);

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      {/* Compact Header */}
      <header className="border-border bg-card shrink-0 border-b">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Header atas */}
          <div className="flex items-center gap-3">
            <div className="bg-success flex h-7 w-7 items-center justify-center rounded-lg">
              <Play className="text-background h-4 w-4" />
            </div>
            <h1 className="text-foreground font-bold">Dfaalt Code Compiler</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Header bawah */}
        <div className="border-border snap-x overflow-x-auto border-t px-4 py-2">
          <div className="flex min-w-max snap-start gap-3 whitespace-nowrap">
            <LanguageSelector
              value={language}
              onChange={handleLanguageChange}
            />
            <CodeTemplates language={language} onSelectTemplate={setCode} />
            <KeyboardShortcuts />
          </div>
        </div>
      </header>

      {/* Main Content - Full height split */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="border-border h-1/2 w-full overflow-hidden border-b lg:h-full lg:w-1/2 lg:border-r lg:border-b-0">
          {language === "html" ? (
            <HtmlEditor
              htmlContent={htmlContent}
              cssContent={cssContent}
              jsContent={jsContent}
              onHtmlChange={setHtmlContent}
              onCssChange={setCssContent}
              onJsChange={setJsContent}
              onSave={handleSaveFile}
              onReset={handleReset}
              onRun={runCode}
              isRunning={isRunning}
            />
          ) : (
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              onSave={handleSaveFile}
              onReset={handleReset}
              onRun={runCode}
              isRunning={isRunning}
            />
          )}
        </div>
        <div className="h-1/2 w-full overflow-hidden lg:h-full lg:w-1/2">
          <OutputConsole output={output} isRunning={isRunning} />
        </div>
      </div>
      <footer className="border-border bg-card shrink-0 border-t py-3 sm:py-4">
        <div className="text-muted-foreground container mx-auto px-3 text-center text-xs sm:px-4 sm:text-sm">
          Online Code Compiler - Support for JavaScript, TypeScript, Python,
          C++, Java, and HTML/CSS
        </div>
      </footer>
    </div>
  );
};

export default Index;
