'use client'
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'
import { Dialog, DialogHeader } from './ui/dialog'
import React from 'react'
import { Plus } from 'lucide-react'
import "../app/globals.css"
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

type Props = {}

export default function CreateNoteDialog({}: Props) {
    const router = useRouter(); 
    const[input, setInput] = React.useState("");

    const creatNoteBook = useMutation({
        mutationFn: async()=>{
            const reaponse = await axios.post("/api/createNoteBook",{
                name:input
            })
            return reaponse.data;
        }
    })


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(input === ""){
            alert("Please enter the name")
            return;
        }
        creatNoteBook.mutate(undefined, {
            onSuccess:({note_id})=>{
                console.log("created id  ",{note_id})
                router.push(`/notebook/${note_id}`)
            },
            onError:(err)=>{
                console.log(err)
                alert("failed to create")
            }
        })

    }

  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                <Plus className='w-6 h-6 text-green-600 ' strokeWidth={3}></Plus>
                <h2 className="font-semibold text-green-600 sm:mt-2">
                    New Notes
                </h2>
            </div>
        </DialogTrigger>
        
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-green-600 sm:mt-2">New Note Book</DialogTitle>
                    <DialogDescription>
                        you can create new note by clicking a button
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input placeholder="Name..." value={input} onChange={(e)=>{
                        setInput(e.target.value);
                    }}/>
                    <div className='h-4'></div>
                    <div className="flex text-center gap-2">
                        <Button type="reset" >Cancel</Button>
                        <Button className='bg-green-600'>Create</Button>
                    </div>
                </form>
            </DialogContent>
        
    </Dialog>
  )
}