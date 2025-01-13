import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {HeadingNode, QuoteNode} from '@lexical/rich-text';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {ListNode, ListItemNode} from '@lexical/list';
import {LinkNode} from '@lexical/link';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode';
import {CodeNode} from '@lexical/code';
import {Button} from "./button";
import {Bold, Italic, Underline, Link, List, Quote, Heading1} from "lucide-react";

import LexicalTheme from '@/LexicalTheme';
import {parseAllowedColor, parseAllowedFontSize} from '@/lexicalStyleConfig';

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const formatHeading = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode("h1"));
      }
    });
  };

  const formatText = (format: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format);
      }
    });
  };

  return (
    <div className="flex gap-2 p-2 border-b">
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
        onClick={formatHeading}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_QUOTE_COMMAND, undefined)}
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  );
};

const placeholder = 'Enter the description...';

const editorConfig = {
  namespace: 'Product Description Editor',
  theme: {
    paragraph: 'mb-1',
    heading: {
      h1: 'text-2xl font-bold mb-2',
      h2: 'text-xl font-bold mb-2',
      h3: 'text-lg font-bold mb-2',
    },
    text: {
      bold: 'font-bold',
      italic: 'italic',
      underline: 'underline',
    },
    list: {
      ul: 'list-disc ml-4 mb-2',
      ol: 'list-decimal ml-4 mb-2',
      listitem: 'mb-1',
    },
    quote: 'border-l-4 border-gray-200 pl-4 mb-2',
  },
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

export function MyLexicalEditor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border rounded-md">
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
        </div>
      </div>
    </LexicalComposer>
  );
}

import {
  $createHeadingNode,
  $createQuoteNode,
  $isRangeSelection,
  $getSelection,
  $setBlocksType,
} from 'lexical';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import {
  FORMAT_QUOTE_COMMAND,
} from '@lexical/rich-text';
