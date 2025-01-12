import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
} from '@/utils/sorting';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  ElementFormatType,
} from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  HeadingTagType,
} from '@lexical/rich-text';

const LowPriority = 1;

const blockTypeToBlockName = {
  paragraph: 'Normal',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  bullet: 'Bullet List',
  number: 'Numbered List',
  check: 'Check List',
  quote: 'Quote',
  code: 'Code Block',
};

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table',
};

const SHORTCUTS = {
  NORMAL: 'Ctrl+Alt+0',
  HEADING1: 'Ctrl+Alt+1',
  HEADING2: 'Ctrl+Alt+2',
  HEADING3: 'Ctrl+Alt+3',
  BULLET_LIST: 'Ctrl+Alt+8',
  NUMBERED_LIST: 'Ctrl+Alt+7',
  CHECK_LIST: 'Ctrl+Alt+9',
  QUOTE: 'Ctrl+Alt+Q',
  CODE_BLOCK: 'Ctrl+Alt+C',
};

function dropDownActiveClass(isActive) {
  return isActive ? 'active' : '';
}

function BlockFormatDropDown({
  editor,
  blockType,
  rootType,
  disabled = false,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="toolbar-item block-controls"
        disabled={disabled}
      >
        <i className={`icon block-type ${blockType}`} />
        {blockTypeToBlockName[blockType]}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => formatParagraph(editor)}
          className={dropDownActiveClass(blockType === 'paragraph')}
        >
          <i className="icon paragraph" />
          Normal
          <span className="shortcut">{SHORTCUTS.NORMAL}</span>
        </DropdownMenuItem>
        {["h1","h2","h3"].map((heading) => (
          <DropdownMenuItem
            key={heading}
            onSelect={() => formatHeading(editor, blockType, heading as HeadingTagType)}
            className={dropDownActiveClass(blockType === heading)}
          >
            <i className={`icon ${heading}`} />
            Heading {heading.charAt(1)}
            <span className="shortcut">{SHORTCUTS[`HEADING${heading.charAt(1)}`]}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onSelect={() => formatBulletList(editor, blockType)}
          className={dropDownActiveClass(blockType === 'bullet')}
        >
          <i className="icon bullet-list" />
          Bullet List
          <span className="shortcut">{SHORTCUTS.BULLET_LIST}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => formatNumberedList(editor, blockType)}
          className={dropDownActiveClass(blockType === 'number')}
        >
          <i className="icon numbered-list" />
          Numbered List
          <span className="shortcut">{SHORTCUTS.NUMBERED_LIST}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => formatCheckList(editor, blockType)}
          className={dropDownActiveClass(blockType === 'check')}
        >
          <i className="icon check-list" />
          Check List
          <span className="shortcut">{SHORTCUTS.CHECK_LIST}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => formatQuote(editor, blockType)}
          className={dropDownActiveClass(blockType === 'quote')}
        >
          <i className="icon quote" />
          Quote
          <span className="shortcut">{SHORTCUTS.QUOTE}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => formatCode(editor, blockType)}
          className={dropDownActiveClass(blockType === 'code')}
        >
          <i className="icon code" />
          Code Block
          <span className="shortcut">{SHORTCUTS.CODE_BLOCK}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(updateToolbar);
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
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
  }, [editor, updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
      <Divider />
      <BlockFormatDropDown blockType="paragraph" rootType="root" editor={editor} />
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={`toolbar-item spaced ${isBold ? 'active' : ''}`}
        aria-label="Format Bold"
      >
        <i className="format bold" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={`toolbar-item spaced ${isItalic ? 'active' : ''}`}
        aria-label="Format Italics"
      >
        <i className="format italic" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className={`toolbar-item spaced ${isUnderline ? 'active' : ''}`}
        aria-label="Format Underline"
      >
        <i className="format underline" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        className={`toolbar-item spaced ${isStrikethrough ? 'active' : ''}`}
        aria-label="Format Strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <Divider />
      {['left', 'center', 'right', 'justify'].map((alignment) => (
        <button
          key={alignment}
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment as ElementFormatType)}
          className="toolbar-item spaced"
          aria-label={`${alignment.charAt(0).toUpperCase() + alignment.slice(1)} Align`}
        >
          <i className={`format ${alignment}-align`} />
        </button>
      ))}
    </div>
  );
}
