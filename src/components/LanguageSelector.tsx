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
  { value: "javascript", label: "JavaScript", icon: "JS" },
  { value: "typescript", label: "TypeScript", icon: "TS" },
  { value: "python", label: "Python", icon: "PY" },
  { value: "cpp", label: "C++", icon: "C++" },
  { value: "java", label: "Java", icon: "JAVA" },
  { value: "html", label: "HTML/CSS", icon: "HTML" },
];

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-secondary border-border">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4" />
          <SelectValue placeholder="Select language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-success">{lang.icon}</span>
              <span>{lang.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
