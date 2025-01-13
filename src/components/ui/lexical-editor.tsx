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
  $createQuoteNode
} from '@lexical/rich-text';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {ListNode, ListItemNode} from '@lexical/list';
import {LinkNode} from '@lexical/link';
import {MarkdownShortcutPlugin} from '@lexical/react/LexicalMarkdownShortcutPlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {HorizontalRuleNode} from '@lexical/react/LexicalHorizontalRuleNode';
import {CodeNode} from '@lexical/code';
import {Button} from "./button";
import {Bold, Italic, Underline, Link, List, Quote, Heading1} from "lucide-react";
import {$getSelection, $isRangeSelection} from 'lexical';
import {$setBlocksType} from '@lexical/selection';
import {INSERT_UNORDERED_LIST_COMMAND} from '@lexical/list';

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

  const formatText = (format: 'bold' | 'italic' | 'underline') => {
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
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  );
};

const placeholder = 'Enter the description...';

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