import { Editor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Toggle } from "@/components/ui/toggle";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CheckIcon,
  ChevronDownIcon,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorMenuBarProps {
  editor: Editor | null;
}

const headingsData = [
  { id: 1, label: "Heading 1", level: 1 },
  { id: 2, label: "Heading 2", level: 2 },
  { id: 3, label: "Heading 3", level: 3 },
  { id: 4, label: "Heading 4", level: 4 },
];

const EditorMenuBar = ({ editor }: EditorMenuBarProps) => {
  if (!editor) return null;

  const getActiveHeadingText = () => {
    if (editor.isActive("heading", { level: 1 })) return "H1";
    if (editor.isActive("heading", { level: 2 })) return "H2";
    if (editor.isActive("heading", { level: 3 })) return "H3";
    if (editor.isActive("heading", { level: 4 })) return "H4";
    return "H1";
  };

  return (
    <div className="flex h-12 items-center gap-4 rounded-t-xl border p-2">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.commands.toggleBold()}
              className={cn(editor.isActive("bold") && "bg-muted")}
            >
              <BoldIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bold</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={editor.isActive("Underline")}
              onPressedChange={() => editor.commands.toggleUnderline()}
              className={cn(editor.isActive("underline") && "bg-muted")}
            >
              <UnderlineIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Underline</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={editor.isActive("italic")}
              onPressedChange={() => editor.commands.toggleItalic()}
              className={cn(editor.isActive("italic") && "bg-muted")}
            >
              <ItalicIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Italic</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={editor.isActive({ textAlign: "left" })}
              onPressedChange={() => editor.commands.toggleTextAlign("left")}
              className={cn(
                editor.isActive({ textAlign: "left" }) && "bg-muted",
              )}
            >
              <AlignLeftIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Align left</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={editor.isActive({ textAlign: "center" })}
              onPressedChange={() => editor.commands.toggleTextAlign("center")}
              className={cn(
                editor.isActive({ textAlign: "center" }) && "bg-muted",
              )}
            >
              <AlignCenterIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Align center</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={editor.isActive({ textAlign: "right" })}
              onPressedChange={() => editor.commands.toggleTextAlign("right")}
              className={cn(
                editor.isActive({ textAlign: "right" }) && "bg-muted",
              )}
            >
              <AlignRightIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Align right</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={editor.isActive({ textAlign: "justify" })}
              onPressedChange={() => editor.commands.toggleTextAlign("justify")}
              className={cn(
                editor.isActive({ textAlign: "justify" }) && "bg-muted",
              )}
            >
              <AlignJustifyIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p>Align justify</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" />
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hover:bg-muted flex items-center rounded-md p-2 hover:cursor-default">
              <p className="text-sm">{getActiveHeadingText()}</p>
              <ChevronDownIcon className="size-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {headingsData.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => {
                  editor.commands.setHeading({ level: item.level as Level });
                }}
                className="group flex items-center"
              >
                {item.label}
                {editor.isActive("heading", { level: item.level }) && (
                  <CheckIcon className="group:hover:text-white" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EditorMenuBar;
