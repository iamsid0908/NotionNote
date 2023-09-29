import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { eq,and } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'
import  Link  from 'next/link'
import { Button } from '@/components/ui/button'
import "../../globals.css"
import { clerk } from '@/lib/db/clerk-server'
import TipTapEditor from '@/components/TipTapEditor'
import DeleteButton from '@/components/DeleteButton'

type Props = {
  params:{
    noteId:string
  }
}

async function page({params:{noteId}}: Props) {

  const {userId} = await auth()
  if(!userId){
    return redirect("/dashboard");
  }
  const user = await clerk.users.getUser(userId);
  const notes = await db.select().from($notes).where(
    and(
      eq($notes.id,parseInt(noteId)),
      eq($notes.userId,userId)
    )
  )
  if(notes.length != 1){
    return redirect("/dashboard")
  }

  const note = notes[0];  

  return (
    <div className="min-h-screen p-8">
      <div className='max-w-4xl mx-auto'>
        <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
          <Link href="/dashboard">
            <Button className='bg-green-600'>Back</Button>
          </Link>
          <div className='w-3'></div>
          <span className='font-semibold'> 
          {user.firstName} {user.lastName}
          </span>
          <div className='inline-block mx-1'>/</div>
          <span className='text-stone-500 font-semibold'>{note.name}</span> 
          <div className='ml-auto'>
          <DeleteButton noteId={note.id}/>
        </div>
        </div>
       
        
        <div className='h-4'></div>
        {/* editor */}
        <div className='border-stone-200 shadow-xl border rounded-lg px-18 py-8 w-full '>
          <TipTapEditor note={note}/> 
        </div>

    </div>
    </div>
  )
}

export default page