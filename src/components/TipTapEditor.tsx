'use client'
import React, { useEffect, useState } from 'react'
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import TipTapMenuBar from './TipTapMenuBar'
import { Button } from './ui/button'
import { useDebounce } from '@/lib/useDebounce'
import { NoteType } from '@/lib/db/schema'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Text from "@tiptap/extension-text"
import {useCompletion} from "ai/react"


type Props = {
    note:NoteType
}

const TipTapEditor = ({note}: Props) => {
    const[editorState ,setEditorState] = useState(note.editorState || "");

    const {complete,completion} = useCompletion({
        api: '/api/completion'
    })
    const saveNote = useMutation({
        mutationFn: async()=>{
            const response = await axios.post("/api/saveNote",{
                noteId: note.id,
                editorState
            });
            return response.data
        }
    })


    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                "Shift-a": ()=>{
                    const prompt = this.editor.getText().split(" ").slice(-30).join(" ")
                    complete(prompt)
                    // console.log("activate AI")
                    return true;
                }
            }
        }
    })

    useEffect(()=>{
        console.log(completion);
    },[completion])

    const editor = useEditor({
        autofocus: true,
        extensions:[StarterKit,customText],
        content:editorState,
        onUpdate:({editor}) =>{
            setEditorState(editor.getHTML());
        },
    })

    const debouncedEditorState = useDebounce(editorState,500);
    useEffect(()=>{
        if(debouncedEditorState === '') return;
        saveNote.mutate(undefined, {
            onSuccess: data=>{
                console.log("success updated ",data)
            },
            onError: err=>{
                console.log(err)
            }
        })
    },[debouncedEditorState]);



  return (
    <>
    <div className='flex'>
        {editor && (
            <TipTapMenuBar editor={editor}/>
        )}
        <Button disabled variant={'outline'}>
            {saveNote.isLoading ? "Saving...":"Saved"}
        </Button>
     </div>   
        <div className='prose'>
            <EditorContent editor={editor}/>
        </div>
 
    </>
  )
}

export default TipTapEditor