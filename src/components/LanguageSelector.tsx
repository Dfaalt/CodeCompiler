import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code2 } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  { value: "javascript", label: "JavaScript", icon: "JS", color: "#f7df1e" }, // Kuning JS
  { value: "typescript", label: "TypeScript", icon: "TS", color: "#3178c6" }, // Biru TS
  { value: "python", label: "Python", icon: "PY", color: "#3776ab" }, // Biru Python
  { value: "cpp", label: "C++", icon: "C++", color: "#00599c" }, // Biru Tua C++
  { value: "java", label: "Java", icon: "JAVA", color: "#b07219" }, // Coklat JAVA
  { value: "html", label: "HTML/CSS/JS", icon: "HTML", color: "#e44d26" }, // Oranye HTML
];

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-secondary border-border w-[180px]">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <SelectValue placeholder="Select language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color: lang.color }}>
                {lang.icon}
              </span>
              <span>{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
