import React, { useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, Quote, Heading1, Heading2, 
  List, ListOrdered, Subscript, Superscript, AlignLeft,
  AlignCenter, AlignRight, Link, Image, Code
} from 'lucide-react';

interface EditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
}

export default function Editor({ initialValue = '', onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      // Set initial content
      editorRef.current.innerHTML = initialValue;
      
      // Focus at the end of content
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [initialValue]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.innerHTML);
  };

  return (
    <div className="border border-gray-600 rounded-lg">
      {/* Toolbar */}
      <div className="border-b border-gray-600 p-2 flex flex-wrap gap-1 bg-gray-800">
        <button className="p-1 hover:bg-gray-700 rounded">
          <Bold size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Italic size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Underline size={18} />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <button className="p-1 hover:bg-gray-700 rounded">
          <Quote size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Heading1 size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Heading2 size={18} />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <button className="p-1 hover:bg-gray-700 rounded">
          <List size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <ListOrdered size={18} />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <button className="p-1 hover:bg-gray-700 rounded">
          <Subscript size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Superscript size={18} />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <button className="p-1 hover:bg-gray-700 rounded">
          <AlignLeft size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <AlignCenter size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <AlignRight size={18} />
        </button>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <select className="bg-gray-700 border border-gray-600 rounded px-2 py-1">
          <option>Normal</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
        </select>
        <select className="bg-gray-700 border border-gray-600 rounded px-2 py-1">
          <option>Sans Serif</option>
          <option>Serif</option>
          <option>Monospace</option>
        </select>
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <button className="p-1 hover:bg-gray-700 rounded">
          <Link size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Image size={18} />
        </button>
        <button className="p-1 hover:bg-gray-700 rounded">
          <Code size={18} />
        </button>
      </div>

      {/* Editor Area */}
      <div 
        ref={editorRef}
        className="p-4 min-h-[200px] bg-gray-900 text-white"
        contentEditable
        onInput={handleInput}
        style={{
          caretColor: 'white',
          outline: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word'
        }}
      />
    </div>
  );
}