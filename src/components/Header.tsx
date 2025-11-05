import { Play } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSelector from "@/components/LanguageSelector";
import CodeTemplates from "@/components/CodeTemplates";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

interface HeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  onSelectTemplate: (code: string) => void;
}

const Header = ({
  language,
  onLanguageChange,
  onSelectTemplate,
}: HeaderProps) => {
  return (
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
          <LanguageSelector value={language} onChange={onLanguageChange} />
          <CodeTemplates
            language={language}
            onSelectTemplate={onSelectTemplate}
          />
          <KeyboardShortcuts />
        </div>
      </div>
    </header>
  );
};

export default Header;
