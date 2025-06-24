import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import { Button } from "@/components/ui/button";

const RichTextEditor = ({ input, setinput }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        strike: false,
        code: false,
      }),
      Underline,
      Strike,
      Code,
    ],
    content: input?.description || "<p>Start writing here...</p>",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      if (setinput && input) {
        setinput({ ...input, description: html });
      }
    },
  });

  useEffect(() => {
    if (editor && input?.description) {
      editor.commands.setContent(input.description);
    }
  }, [input?.description, editor]);

  if (!editor) return null;

  return (
    <div className="border p-4 rounded-md shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "text-blue-600" : ""}
        >
          Bold
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "text-blue-600" : ""}
        >
          Italic
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "text-blue-600" : ""}
        >
          Underline
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "text-blue-600" : ""}
        >
          Strike
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "text-blue-600" : ""}
        >
          Code
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[150px] p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
    </div>
  );
};

export default RichTextEditor;
