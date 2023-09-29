import React from 'react'
import{ Editor } from "@tiptap/react"
import { Bold, Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, Strikethrough } from 'lucide-react';

type Props = {
    editor:Editor;
}

const TipTapMenuBar = ({editor}: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
        <button onClick={()=> editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold')? "is-active":""}
        >
            <Bold className='w-6 h-6'></Bold>
        </button>

        <button onClick={()=> editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic')? "is-active":""}
        >
            <Italic className='w-6 h-6'/>
        </button>

        <button onClick={()=> editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive('code')? "is-active":""}
        >
            <Code className='w-6 h-6'/>
        </button>

        <button onClick={()=> editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike')? "is-active":""}
        >
            <Strikethrough className='w-6 h-6'/>
        </button>
        <button onClick={()=> editor.chain().focus().toggleHeading({level:1}).run()}
        className={editor.isActive('h1')? "is-active":""}
        >
            <Heading1 className='w-6 h-6'/>
        </button>

        <button onClick={()=> editor.chain().focus().toggleHeading({level:2}).run()}
        className={editor.isActive('h2')? "is-active":""}
        >
            <Heading2 className='w-6 h-6'/>
        </button>
        <button onClick={()=> editor.chain().focus().toggleHeading({level:3}).run()}
        className={editor.isActive('h3')? "is-active":""}
        >
            <Heading3 className='w-6 h-6'/>
        </button>
        <button onClick={()=> editor.chain().focus().toggleHeading({level:4}).run()}
        className={editor.isActive('h4')? "is-active":""}
        >
            <Heading4 className='w-6 h-6'/>
        </button>
        <button onClick={()=> editor.chain().focus().toggleHeading({level:5}).run()}
        className={editor.isActive('h5')? "is-active":""}
        >
            <Heading5 className='w-6 h-6'/>
        </button>
        <button onClick={()=> editor.chain().focus().toggleHeading({level:6}).run()}
        className={editor.isActive('h6')? "is-active":""}
        >
            <Heading6 className='w-6 h-6'/>
        </button>

      


    </div>
  )
}

export default TipTapMenuBar