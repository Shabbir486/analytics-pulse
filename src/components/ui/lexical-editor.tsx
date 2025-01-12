import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { ToolbarPlugin } from "@lexical/react/LexicalTablePlugin";
import { $getRoot, $createParagraphNode, $createTextNode, EditorState } from 'lexical';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkNode, LinkPlugin } from "@lexical/link";
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Button } from "./button";
import { Bold, Italic, Underline, Link, List, Quote, Heading1 } from "lucide-react";

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: string) => {
    editor.update(() => {
      const selection = window.getSelection();
      if (selection) {
        document.execCommand(format, false);
      }
    });
  };

  return (
    <div className="flex items-center gap-1 p-1 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatText('bold')}
        className="h-8 w-8"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatText('italic')}
        className="h-8 w-8"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatText('underline')}
        className="h-8 w-8"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <div className="w-[1px] h-4 bg-border mx-1" />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatText('insertUnorderedList')}
        className="h-8 w-8"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatText('formatBlock')}
        className="h-8 w-8"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatText('heading')}
        className="h-8 w-8"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => formatText('createLink')}
        className="h-8 w-8"
      >
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface LexicalEditorProps {
  onChange?: (value: string) => void;
  initialValue?: string;
  className?: string;
}

export function LexicalEditor({ onChange, initialValue = "", className = "" }: LexicalEditorProps) {
  const initialConfig = {
    namespace: 'ProductDescription',
    onError: (error: Error) => console.error(error),
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
    theme: {
      paragraph: 'mb-1',
      text: {
        base: 'text-sm text-foreground',
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'line-through',
        underlineStrikethrough: 'underline line-through',
      },
      list: {
        ul: 'list-disc list-inside',
        ol: 'list-decimal list-inside',
      },
      quote: 'border-l-4 border-gray-200 pl-4 italic',
    },
    editable: true,
    editorState: () => {
      const root = $getRoot();
      if (root.getFirstChild() === null && initialValue) {
        const paragraph = $createParagraphNode();
        paragraph.append($createTextNode(initialValue));
        root.append(paragraph);
      }
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={`relative min-h-[120px] w-full rounded-md border border-input bg-background ring-offset-background ${className}`}>
        <Toolbar />
        <div className="px-3 py-2">
          <RichTextPlugin
            contentEditable={
              <ContentEditable 
                className="min-h-[80px] outline-none"
              />
            }
            placeholder={
              <div className="absolute top-[52px] left-[13px] text-sm text-muted-foreground pointer-events-none">
                Enter description...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            editorState.read(() => {
              const root = $getRoot();
              const text = root.getTextContent();
              onChange?.(text);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}