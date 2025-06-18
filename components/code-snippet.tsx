import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy, Check, Code2, Download } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";

import {
  FaCss3Alt,
  FaGolang,
  FaHtml5,
  FaJava,
  FaPython,
  FaRust,
} from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { SiPhp, SiRuby, SiTypescript } from "react-icons/si";
import { BsFiletypeScss } from "react-icons/bs";
import { IoTerminalSharp } from "react-icons/io5";
import { BiLogoPostgresql } from "react-icons/bi";
import { LuCodeXml } from "react-icons/lu";
import { VscJson } from "react-icons/vsc";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeSnippetProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language,
  title,
  className = "",
  showLineNumbers = true,
  maxHeight = "none",
}) => {
  const { copied, copyToClipboard } = useClipboard();

  const getLanguageIcon = (lang: string) => {
    const language = lang.toLowerCase();

    const iconMap: { [key: string]: React.ReactNode } = {
      javascript: <IoLogoJavascript size={16} />,
      js: <IoLogoJavascript size={16} />,
      typescript: <SiTypescript size={16} />,
      ts: <SiTypescript size={16} />,
      python: <FaPython size={16} />,
      py: <FaPython size={16} />,
      java: <FaJava size={16} />,
      html: <FaHtml5 size={16} />,
      css: <FaCss3Alt size={16} />,
      scss: <BsFiletypeScss size={16} />,
      sass: <FaCss3Alt size={16} />,
      bash: <IoTerminalSharp size={16} />,
      shell: <IoTerminalSharp size={16} />,
      sql: <BiLogoPostgresql size={16} />,
      json: <VscJson size={16} />,
      xml: <LuCodeXml size={16} />,
      php: <SiPhp size={16} />,
      ruby: <SiRuby size={16} />,
      go: <FaGolang size={16} />,
      rust: <FaRust size={16} />,
    };

    return iconMap[language] || <Code2 className="w-4 h-4 text-gray-400" />;
  };

  const getLanguageDisplayName = (lang: string) => {
    const language = lang.toLowerCase();

    const nameMap: Record<string, string> = {
      js: "JavaScript",
      ts: "TypeScript",
      py: "Python",
      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      sass: "Sass",
      bash: "Bash",
      shell: "Shell",
      sql: "SQL",
      java: "Java",
      php: "PHP",
      ruby: "Ruby",
      go: "Go",
      rust: "Rust",
      json: "JSON",
      xml: "XML",
    };

    return (
      nameMap[language] || language.charAt(0).toUpperCase() + language.slice(1)
    );
  };

  const extensionMap: Record<string, string> = {
    javascript: "js",
    js: "js",
    typescript: "ts",
    ts: "ts",
    python: "py",
    py: "py",
    java: "java",
    html: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    bash: "sh",
    shell: "sh",
    sql: "sql",
    json: "json",
    xml: "xml",
    php: "php",
    ruby: "rb",
    go: "go",
    rust: "rs",
  };

  const handleCopy = () => {
    copyToClipboard(code);
  };

  const handleDownload = () => {
    const ext = extensionMap[language.toLowerCase()] || "txt";
    const filename = `${title || "code-snippet"}.${ext}`;

    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={cn(
        `rounded-xl ${className} rounded-sm overflow-hidden w-full font-[family-name:var(--font-geist-mono)] tracking-tight bg-[#F5ECF9]`,
        "dark:bg-[#1A161F]"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "relative flex items-center justify-between pl-2 bg-[#F1C4E6]",
          "dark:bg-[#362D3D]"
        )}
      >
        <span
          className={cn("text-pink-900 capitalize pl-2", "dark:text-pink-100")}
        >
          {getLanguageDisplayName(language)}
        </span>

        <div className="flex items-center justify-center space-x-1">
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
          >
            <div className="relative">
              {copied ? (
                <Check className="w-4 h-4 animate-in fade-in duration-200" />
              ) : (
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div
        className={cn(
          "relative overflow-auto overflow-x-hidden",
          "dark:bg-[#1A161F]"
        )}
        style={{ maxHeight, background: "inherit" }}
      >
        <SyntaxHighlighter
          wrapLines
          wrapLongLines
          language={language}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            background: "transparent",
            fontSize: "16px",
            lineHeight: "1.6",
            fontFamily: "BerkeleyMono, Consolas",
          }}
          className="font-[family-name:var(--font-geist-mono)]"
          // showLineNumbers={showLineNumbers}
          // lineNumberStyle={{
          //   color: "#6B7280",
          //   fontSize: "16px",
          //   paddingRight: "1.5rem",
          //   userSelect: "none",
          //   minWidth: "2.5rem",
          // }}
          lineProps={(lineNumber) => ({
            style: {
              display: "block",
              width: "100%",
            },
          })}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
