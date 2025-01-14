import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { CodeNode } from "@lexical/code";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";

import LexicalTheme from "@/LexicalTheme";
import { ToolbarContext } from "@/context/toolbarContext";
import { useState } from "react";
import FloatingLinkEditorPlugin from "@/plugins/FloatingLinkEditorPlugin";
import { Toolbar } from "@/plugins/ToolbarPlugin";

interface EditorProps {
  onChange?: (editorState: EditorState) => void;
  initialValue?: string;
  className?: string;
  placeholder: string;
}

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
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  const initialConfig = {
    ...editorConfig,
    editorState: null,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={`border rounded-md ${className}`}>
        <ToolbarContext>
          <Toolbar setIsLinkEditMode={setIsLinkEditMode} />
        </ToolbarContext>
        <div className="p-2 relative">
          <RichTextPlugin
            contentEditable={
              <div className="editor" ref={onRef}>
                <ContentEditable
                  className="min-h-[150px] outline-none"
                  aria-label="Rich text editor"
                />
              </div>
            }
            placeholder={
              <div className="absolute top-2 left-2 text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          {floatingAnchorElem && (
            <>
              <FloatingLinkEditorPlugin
                anchorElem={floatingAnchorElem}
                isLinkEditMode={isLinkEditMode}
                setIsLinkEditMode={setIsLinkEditMode}
              />
            </>
          )}
          <HistoryPlugin />
          <AutoFocusPlugin />
          <LinkPlugin />
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
