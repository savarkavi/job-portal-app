"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./editor-menu-bar";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import "./styles.css";

const JobDescriptionEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3, 4] }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  return (
    <div className="mt-2 min-h-[500px] rounded-xl border">
      <EditorMenuBar editor={editor} />
      <div className="mt-2 p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default JobDescriptionEditor;
