import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  $isHeadingNode,
  HeadingNode,
  HeadingTagType,
  QuoteNode,
} from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { ListNode, ListItemNode, $isListNode } from "@lexical/list";
import { $isLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { CodeNode } from "@lexical/code";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { Button } from "./button";
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
  Maximize2,
  Redo,
  Undo,
} from "lucide-react";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  EditorState,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
  UNDO_COMMAND,
} from "lexical";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LexicalTheme from "@/LexicalTheme";
import { formatHeading, formatParagraph, getSelectedNode, sanitizeUrl } from "@/utils/lexical-utils";
import {
  blockTypeToBlockName,
  ToolbarContext,
  useToolbarState,
} from "@/context/toolbarContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";

interface EditorProps {
  onChange?: (editorState: EditorState) => void;
  initialValue?: string;
  className?: string;
  placeholder: string;
}

const Toolbar = ({
  setIsLinkEditMode
}) => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const { toolbarState, updateToolbarState } = useToolbarState();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      //Updating state for the dropdown
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });
      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        //for list node update
        // if ($isListNode(element)) {
        //   const parentList = $getNearestNodeOfType<ListNode>(
        //     anchorNode,
        //     ListNode,
        //   );
        //   const type = parentList
        //     ? parentList.getListType()
        //     : element.getListType();

        //   updateToolbarState('blockType', type);
        // } else {
        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType();
        if (type in blockTypeToBlockName) {
          updateToolbarState(
            "blockType",
            type as keyof typeof blockTypeToBlockName
          );
        }
      }
      // }

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState('isLink', isLink);
    }
  }, []);
  type Func = () => void;
  function mergeRegister(...func: Array<Func>): () => void {
    return () => {
      for (let i = func.length - 1; i >= 0; i--) {
        func[i]();
      }
      // Clean up the references and make future calls a no-op
      func.length = 0;
    };
  }
  const LowPriority = 1;
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      editor.dispatchCommand(
        TOGGLE_LINK_COMMAND,
        sanitizeUrl('https://'),
      );
    } else {
      setIsLinkEditMode(false);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, setIsLinkEditMode, toolbarState.isLink]);

  const handleFormatHeading = (type: string) => {
    if (type === "paragraph") {
      formatParagraph(editor);
    } else {
      formatHeading(editor, toolbarState.blockType, type as HeadingTagType);
    }
  };

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatAlignment = (
    alignment: "left" | "center" | "right" | "justify"
  ) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  return (
    <div
      className="flex items-center gap-1 p-2 border-b bg-background"
      ref={toolbarRef}
    >
      <Button
        variant="ghost"
        disabled={!canUndo}
        size="sm"
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="Bold text"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        disabled={!canRedo}
        size="sm"
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label="Bold text"
      >
        <Redo className="h-4 w-4" />
      </Button>
      <Select onValueChange={handleFormatHeading}>
        <SelectTrigger
          className="w-[130px] h-8"
          aria-label="Text formatting options"
        >
          {toolbarState.blockType ? (
            <span className="text-sm">
              {blockTypeToBlockName[toolbarState.blockType]}
            </span>
          ) : (
            <SelectValue placeholder="Paragraph" />
          )}
        </SelectTrigger>
        <SelectContent aria-describedby="format-description">
          <SelectItem value="paragraph">Normal</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
          <SelectItem value="h4">Heading 4</SelectItem>
          <SelectItem value="h5">Heading 5</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={isBold ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatText("bold")}
        aria-label="Bold text"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={isItalic ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatText("italic")}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={isUnderline ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatText("underline")}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        variant={isStrikethrough ? "secondary" : "ghost"}
        size="sm"
        onClick={() => formatText("strikethrough")}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        aria-label="Insert unordered list"
      >
        <ListIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        aria-label="Insert ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={insertLink}
        aria-label="Insert link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => {}}>
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={() => formatAlignment("left")}>
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatAlignment("center")}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatAlignment("right")}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatAlignment("justify")}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={() => {}}>
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const editorConfig = {
  namespace: "Product Description Editor",
  theme: LexicalTheme,
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    HorizontalRuleNode,
    CodeNode,
  ],
  onError(error: Error) {
    console.error(error);
  },
};

export function MyLexicalEditor({
  onChange,
  initialValue,
  className,
  placeholder,
}: EditorProps) {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const initialConfig = {
    ...editorConfig,
    editorState: null,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={`border rounded-md ${className}`}>
        <ToolbarContext>
          <Toolbar setIsLinkEditMode={setIsLinkEditMode}/>
        </ToolbarContext>
        <div className="p-2 relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[150px] outline-none"
                aria-label="Rich text editor"
              />
            }
            placeholder={
              <div className="absolute top-2 left-2 text-gray-400 pointer-events-none">
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
