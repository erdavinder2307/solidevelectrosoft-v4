import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { uploadImageToFirebase } from '../../utils/imageUtils';

/**
 * BlogEditor Component
 * Rich text editor for blog content with support for:
 * - Headings (H2-H4)
 * - Bold, italic, strikethrough
 * - Lists (ordered & unordered)
 * - Blockquotes
 * - Code blocks
 * - Inline links
 * - Inline images with alt text
 * 
 * Outputs clean semantic HTML
 */
const BlogEditor = ({ content, onChange, errors }) => {
  const handleImageUpload = useCallback(async (file) => {
    try {
      const url = await uploadImageToFirebase(file, 'blogs');
      return url;
    } catch (err) {
      console.error('Image upload failed:', err);
      throw new Error('Failed to upload image');
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4], // H2-H4 only
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        codeBlock: {
          languageClassPrefix: 'language-',
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: 'editor-image',
          loading: 'lazy',
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your blog content here... Press "/" for formatting options.',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  if (!editor) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading editor…</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px 8px 0 0',
          borderBottom: '1px solid #e5e7eb',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('bold') ? '#667eea' : 'white',
            color: editor.isActive('bold') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Bold (Ctrl+B)"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('italic') ? '#667eea' : 'white',
            color: editor.isActive('italic') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontStyle: 'italic',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Italic (Ctrl+I)"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('strike') ? '#667eea' : 'white',
            color: editor.isActive('strike') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            textDecoration: 'line-through',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Strikethrough"
        >
          S
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }} />

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('heading', { level: 2 }) ? '#667eea' : 'white',
            color: editor.isActive('heading', { level: 2 }) ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s',
          }}
          title="Heading 2"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('heading', { level: 3 }) ? '#667eea' : 'white',
            color: editor.isActive('heading', { level: 3 }) ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s',
          }}
          title="Heading 3"
        >
          H3
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('heading', { level: 4 }) ? '#667eea' : 'white',
            color: editor.isActive('heading', { level: 4 }) ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s',
          }}
          title="Heading 4"
        >
          H4
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }} />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('bulletList') ? '#667eea' : 'white',
            color: editor.isActive('bulletList') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Bullet List"
        >
          •
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('orderedList') ? '#667eea' : 'white',
            color: editor.isActive('orderedList') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Ordered List"
        >
          1.
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }} />

        {/* Block Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('blockquote') ? '#667eea' : 'white',
            color: editor.isActive('blockquote') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Blockquote"
        >
          "
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('codeBlock') ? '#667eea' : 'white',
            color: editor.isActive('codeBlock') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '13px',
            transition: 'all 0.2s',
          }}
          title="Code Block"
        >
          &lt;&gt;
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#d1d5db' }} />

        {/* Link & Image */}
        <button
          type="button"
          onClick={() => {
            const url = prompt('Enter link URL:');
            if (url) {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
          }}
          style={{
            padding: '8px 12px',
            backgroundColor: editor.isActive('link') ? '#667eea' : 'white',
            color: editor.isActive('link') ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Insert Link"
        >
          🔗
        </button>

        <button
          type="button"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (file.size > 5 * 1024 * 1024) {
                  alert('Image must be under 5MB');
                  return;
                }
                try {
                  const url = await handleImageUpload(file);
                  const alt = prompt('Enter image alt text:') || 'Image';
                  editor.chain().focus().setImage({ src: url, alt }).run();
                } catch (err) {
                  alert('Failed to upload image: ' + err.message);
                }
              }
            };
            input.click();
          }}
          style={{
            padding: '8px 12px',
            backgroundColor: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s',
          }}
          title="Insert Image"
        >
          🖼️
        </button>

        <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>
          Tip: Press "/" for slash commands
        </div>
      </div>

      {/* Editor Content */}
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          minHeight: '300px',
          padding: '16px',
          backgroundColor: 'white',
          overflow: 'auto',
        }}
      >
        <EditorContent
          editor={editor}
          style={{
            minHeight: '300px',
            outline: 'none',
          }}
          className="blog-editor"
        />
      </div>

      {/* Error Message */}
      {errors?.content && (
        <div style={{ color: '#991b1b', fontSize: '14px', marginTop: '8px' }}>
          {errors.content}
        </div>
      )}

      {/* Editor Styles */}
      <style>{`
        .blog-editor {
          outline: none;
        }

        .blog-editor.is-editor-empty div.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .blog-editor h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #111827;
          line-height: 1.3;
        }

        .blog-editor h2:first-child {
          margin-top: 0;
        }

        .blog-editor h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.875rem;
          color: #1f2937;
          line-height: 1.4;
        }

        .blog-editor h4 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
          color: #374151;
          line-height: 1.5;
        }

        .blog-editor p {
          margin-bottom: 1rem;
          color: #4b5563;
          line-height: 1.8;
          font-size: 1rem;
        }

        .blog-editor ul,
        .blog-editor ol {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }

        .blog-editor li {
          margin-bottom: 0.5rem;
          color: #4b5563;
          line-height: 1.8;
        }

        .blog-editor blockquote {
          border-left: 4px solid #667eea;
          padding-left: 1.5rem;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 1rem;
          color: #6b7280;
          font-style: italic;
        }

        .blog-editor pre {
          background: #1f2937;
          color: #f3f4f6;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin-bottom: 1rem;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .blog-editor code {
          background: #f9fafb;
          color: #7c3aed;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
        }

        .blog-editor pre code {
          background: none;
          color: #f3f4f6;
          padding: 0;
          border-radius: 0;
        }

        .blog-editor a {
          color: #667eea;
          text-decoration: underline;
          cursor: pointer;
        }

        .blog-editor a:hover {
          color: #5568d3;
        }

        .blog-editor .editor-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5rem 0;
          display: block;
        }

        .blog-editor img.ProseMirror-selectednode {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;
