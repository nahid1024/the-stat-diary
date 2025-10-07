"use client"

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import copy from "copy-to-clipboard";

/**
 * Props for the CodeBlock component.
 * - language: programming language for syntax highlighting (e.g. "ts", "js", "py").
 * - code: the raw code block string (may include Markdown fences like ```).
 * - darkMode: optional boolean to select dark vs light highlighting theme.
 */
interface CodeBlockProps {
    language: string;
    code: string;
    darkMode?: boolean;
}

/**
 * CodeBlock
 *
 * Renders a syntax-highlighted code block with a copy-to-clipboard button.
 * This is a client component because it uses state and browser APIs.
 *
 * Implementation notes:
 * - We remove Markdown fences (```) from incoming `code` so the highlighter
 *   receives just the source text.
 * - The copy button uses `copy-to-clipboard` and shows temporary feedback
 *   by toggling a `copied` state for 1.5s.
 * - The component intentionally doesn't modify the code content beyond
 *   trimming fences; avoid transforming code semantics.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, darkMode = false }) => {
    // Tracks temporary UI state when the code has been copied.
    const [copied, setCopied] = useState(false);

    // Copy handler: copy cleaned code to the clipboard and show feedback.
    // We remove any Markdown code fences (```) and trim whitespace before copying.
    const handleCopy = () => {
        copy(code.replace(/```/g, "").trim());
        setCopied(true);
        // Reset the copied state after 1.5 seconds so the button text returns to "Copy".
        setTimeout(() => setCopied(false), 1500);
    };

    // Prepare the string passed to the syntax highlighter.
    // This avoids rendering triple-backtick fences inside the highlighted block.
    const cleanedCode = code.replace(/```/g, "").trim();

    return (
        <div className="relative my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {/*
                Header: displays the language and a copy button.
                - The header uses a monospaced font to match the code style.
                - The button provides quick copy feedback; consider adding
                  aria-live or aria-label attributes for improved accessibility
                  if screen-reader feedback is needed.
            */}
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-mono text-gray-700 dark:text-gray-300">
                <span>{language}</span>
                <button
                    onClick={handleCopy}
                    // Styling keeps the control visually consistent in light/dark mode.
                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 cursor-pointer rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            {/*
                SyntaxHighlighter: renders highlighted code.
                - `language.toLowerCase()` ensures language tokens are lowercase as expected
                  by the highlighter.
                - `wrapLines` ensures long lines wrap instead of creating scrollbars.
                - `customStyle` removes default margins and sets padding/font size to match UI.
            */}
            <SyntaxHighlighter
                language={language.toLowerCase()}
                style={darkMode ? materialDark : materialLight}
                wrapLines
                customStyle={{ margin: 0, padding: "1rem", fontSize: "0.8rem" }}
            >
                {cleanedCode}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
