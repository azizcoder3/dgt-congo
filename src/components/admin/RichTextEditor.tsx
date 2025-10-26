// src/components/admin/RichTextEditor.tsx (CODE CORRIGÉ)

'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useState, useEffect } from 'react';

// --- La barre d'outils complète ---
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [linkUrl, setLinkUrl] = useState('');

  if (!editor) return null;

  const setLink = () => {
    if (linkUrl === '') return;
    
    // On applique le lien
    editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setLinkUrl('');
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
      {/* Style de texte */}
      <div className="flex gap-1 mr-2">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`} 
          title="Gras"
        >
          <strong>B</strong>
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`} 
          title="Italique"
        >
          <em>I</em>
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleUnderline().run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-300' : ''}`} 
          title="Souligné"
        >
          <u>U</u>
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleStrike().run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`} 
          title="Barré"
        >
          <s>S</s>
        </button>
      </div>

      {/* Alignement */}
      <div className="flex gap-1 mr-2">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().setTextAlign('left').run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''}`} 
          title="Aligner à gauche"
        >
          ↶
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().setTextAlign('center').run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''}`} 
          title="Centrer"
        >
          ↔
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().setTextAlign('right').run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''}`} 
          title="Aligner à droite"
        >
          ↷
        </button>
      </div>

      {/* Titres et Paragraphe */}
      <div className="flex gap-1 mr-2">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().setParagraph().run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-gray-300' : ''}`} 
          title="Paragraphe"
        >
          P
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`} 
          title="Titre H2"
        >
          H2
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''}`} 
          title="Titre H3"
        >
          H3
        </button>
      </div>

      {/* Listes */}
      <div className="flex gap-1 mr-2">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`} 
          title="Liste à puces"
        >
          •
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`} 
          title="Liste numérotée"
        >
          1.
        </button>
      </div>

      {/* Liens */}
      <div className="flex gap-1 items-center">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().unsetLink().run()} 
          disabled={!editor.isActive('link')} 
          className={`p-2 rounded hover:bg-gray-200 ${!editor.isActive('link') ? 'opacity-50' : ''}`} 
          title="Supprimer le lien"
        >
          🔗❌
        </button>
        <div className="flex gap-1">
          <input 
            type="url" 
            value={linkUrl} 
            onChange={(e) => setLinkUrl(e.target.value)} 
            placeholder="https://..." 
            className="px-2 py-1 border border-gray-300 rounded text-sm w-32" 
          />
          <button 
            type="button" 
            onClick={setLink} 
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>

      {/* Annuler/Refaire */}
      <div className="flex gap-1 ml-2">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().undo().run()} 
          className="p-2 rounded hover:bg-gray-200" 
          title="Annuler"
        >
          ↩
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().redo().run()} 
          className="p-2 rounded hover:bg-gray-200" 
          title="Refaire"
        >
          ↪
        </button>
      </div>
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (htmlContent: string) => void;
}

// --- Le composant Éditeur principal ---
const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ 
        openOnClick: false, 
        HTMLAttributes: { class: 'text-blue-500 underline' } 
      }),
      TextAlign.configure({ 
        types: ['heading', 'paragraph'] 
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      // À chaque modification, on informe le formulaire parent
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 min-h-[200px] focus:outline-none',
      },
    },
    // CORRECTION : Ajout de l'option pour éviter les erreurs SSR
    immediatelyRender: false,
  });

  // Synchronisation du contenu depuis les props
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  return (
    <div className="bg-white rounded-lg border border-gray-300 rich-text-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;