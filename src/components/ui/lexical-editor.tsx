import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {
  HeadingNode, 
  QuoteNode,
  $createHeadingNode,
} from '@lexical/rich-text';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {ListNode, ListItemNode, INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND} from '@lexical/list';
import {LinkNode, TOGGLE_LINK_COMMAND} from '@lexical/link';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode';
import {CodeNode} from '@lexical/code';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {Button} from "./button";
import {
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  List as ListIcon, 
  ListOrdered,
  Quote as QuoteIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Maximize2
} from "lucide-react";
import {$getSelection, $isRangeSelection, TextFormatType, EditorState, $getRoot, $createParagraphNode} from 'lexical';
import {$setBlocksType} from '@lexical/selection';
import {FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND} from 'lexical';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LexicalTheme from '@/LexicalTheme';

interface EditorProps {
  onChange?: (editorState: EditorState) => void;
  initialValue?: string;
  className?: string;
}

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (type: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (type === 'paragraph') {
          // Convert to paragraph node
          const root = $getRoot();
          root.clear();
          root.append($createParagraphNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(type as "h1" | "h2" | "h3" | "h4" | "h5"));
        }
      }
    });
  };

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatAlignment = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b bg-background">
      <Select onValueChange={formatHeading}>
        <SelectTrigger className="w-[130px] h-8">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
          <SelectItem value="h4">Heading 4</SelectItem>
          <SelectItem value="h5">Heading 5</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center border-l mx-1 pl-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatText('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatText('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatText('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatText('strikethrough')}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center border-l mx-1 pl-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        >
          <ListIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center border-l mx-1 pl-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center border-l mx-1 pl-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatAlignment('left')}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatAlignment('center')}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatAlignment('right')}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => formatAlignment('justify')}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center border-l mx-1 pl-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const placeholder = 'Write something awesome...';

const editorConfig = {
  namespace: 'Product Description Editor',
  theme: LexicalTheme,
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    HorizontalRuleNode,
    CodeNode
  ],
  onError(error: Error) {
    console.error(error);
  },
};

export function MyLexicalEditor({ onChange, initialValue, className }: EditorProps) {
  const initialConfig = {
    ...editorConfig,
    editorState: initialValue,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={`border rounded-md ${className}`}>
        <Toolbar />
        <div className="p-2">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[150px] outline-none"
              />
            }
            placeholder={
              <div className="absolute top-[60px] left-[10px] text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <MarkdownShortcutPlugin />
          {onChange && (
            <OnChangePlugin
              onChange={onChange}
              ignoreHistoryMergeTagChange={true}
              ignoreSelectionChange={true}
            />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}