"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export const RichTextInput: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const toggleCommands: Record<string, () => void> = {
    bold: () => editor?.chain().focus().toggleBold().run(),
    italic: () => editor?.chain().focus().toggleItalic().run(),
    underline: () => editor?.chain().focus().toggleUnderline().run(),
    strike: () => editor?.chain().focus().toggleStrike().run(),
    code: () => editor?.chain().focus().toggleCode().run(),
    bulletList: () => editor?.chain().focus().toggleBulletList().run(),
    orderedList: () => editor?.chain().focus().toggleOrderedList().run(),
    blockquote: () => editor?.chain().focus().toggleBlockquote().run(),
    link: () => {
      const previousUrl = editor?.getAttributes("link").href || "";
      const url = window.prompt("Enter URL", previousUrl);

      if (url === null) return;
      if (url === "") {
        editor?.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }

      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    clear: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(),
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="border rounded-md p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {Object.entries(toggleCommands).map(([cmd, fn]) => (
          <button
            key={cmd}
            type="button"
            onClick={fn}
            className={`border px-2 py-1 rounded ${
              cmd !== "clear" && editor.isActive(cmd)
                ? "bg-black text-white"
                : ""
            }`}
            title={cmd.charAt(0).toUpperCase() + cmd.slice(1)}
          >
            {cmd === "bold" && <b>B</b>}
            {cmd === "italic" && <i>I</i>}
            {cmd === "underline" && <u>U</u>}
            {cmd === "strike" && <s>S</s>}
            {cmd === "code" && <code>{"</>"}</code>}
            {cmd === "bulletList" && <>• List</>}
            {cmd === "orderedList" && <>1. List</>}
            {cmd === "blockquote" && <>❝</>}
            {cmd === "link" && <>🔗</>}
            {cmd === "clear" && <>✖</>}
          </button>
        ))}
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[150px] border p-2 rounded"
      />
    </div>
  );
};
