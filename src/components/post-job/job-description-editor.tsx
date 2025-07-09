"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "./editor-menu-bar";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import "./styles.css";
import { ControllerRenderProps } from "react-hook-form";
import { JobPostFormValues } from "@/lib/types";

interface JobDescriptionEditorProps {
  field: ControllerRenderProps<JobPostFormValues, "jobDescription">;
}

const JobDescriptionEditor = ({ field }: JobDescriptionEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ListItem,
      BulletList,
      OrderedList,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3, 4] }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[300px] prose",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
  });

  return (
    <div className="mx-auto mt-2 min-h-[500px] w-full max-w-[320px] rounded-xl border">
      <EditorMenuBar editor={editor} />
      <div className="prose p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default JobDescriptionEditor;
