import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, $createParagraphNode, $createTextNode, EditorState } from 'lexical';

interface LexicalEditorProps {
  onChange?: (value: string) => void;
  initialValue?: string;
  className?: string;
}

export function LexicalEditor({ onChange, initialValue = "", className = "" }: LexicalEditorProps) {
  const initialConfig = {
    namespace: 'ProductDescription',
    onError: (error: Error) => console.error(error),
    nodes: [],
    theme: {
      paragraph: 'mb-1',
      text: {
        base: 'text-sm text-foreground',
      },
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
      <div className={`relative min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background ${className}`}>
        <PlainTextPlugin
          contentEditable={
            <ContentEditable 
              className="min-h-[80px] outline-none"
            />
          }
          placeholder={
            <div className="absolute top-[11px] left-[13px] text-sm text-muted-foreground pointer-events-none">
              Enter description...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
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