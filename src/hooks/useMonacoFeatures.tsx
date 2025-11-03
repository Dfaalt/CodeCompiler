import type { OnMount } from "@monaco-editor/react";

export const useMonacoFeatures = (): OnMount => {
  return (editor, monaco) => {
    editor.updateOptions({
      autoClosingBrackets: "always",
      autoClosingQuotes: "always",
      autoSurround: "languageDefined",
      autoIndent: "full",
      bracketPairColorization: { enabled: true },
    });

    monaco.languages.setLanguageConfiguration("javascript", {
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "(", close: ")" },
        { open: "[", close: "]" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      onEnterRules: [
        {
          beforeText: /{\s*$/,
          afterText: /^\s*}/,
          action: { indentAction: monaco.languages.IndentAction.IndentOutdent },
        },
      ],
    });
  };
};
