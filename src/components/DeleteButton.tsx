"use client"
import React from 'react'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Console, error } from 'console'

type Props = {
    noteId:number
}

const DeleteButton = ({noteId}: Props) => {

    const router = useRouter();
    const deleteNote = useMutation({
        mutationFn: async ()=>{
            const response = await axios.post("/api/deleteNote",{
                noteId
            })
            return response.data
        }
    })

  return (
    <Button variant={'destructive'} 
            size='sm'
            disabled = {deleteNote.isLoading}
             onClick={()=>{
        const confirm = window.confirm("Are sure you want to delete")
        if(!confirm){
            return; 
        }
        deleteNote.mutate(undefined,{
            onSuccess:()=>{
                router.push("/dashboard")
            },
            onError:(error)=>{
                console.log(error)
            }
        })
    }}>
        <Trash/>
    </Button>
  )
}

export default DeleteButton