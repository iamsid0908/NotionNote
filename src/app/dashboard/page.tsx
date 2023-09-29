import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../globals.css"

type Props = {}

// export default async function DashboardPage({}: Props) {

  const DashboardPage = async (props: Props) => {
    const { userId } = auth();
    const notes = await db
      .select()
      .from($notes)
      .where(eq($notes.userId, userId!));

   

  return (
    <>
    <div className=' min-h-screen'>
      <div className='max-w-7x1 mx-auto p-10'>
        <div className='h-10'></div>
        <div className='flex justify-between item-center md:flex-row flex-col'> 
        <div className='flex item-center'>
          <Link href='/'>
            <Button className='bg-green-600'>
              <ArrowLeft className='mr-1 w-4 h-4'/>
               Back
              </Button>
          </Link>
          <div className='w-4'></div>
          <h1 className='text-3xl font-bold text-gray-900'>My Notes</h1>
          <div className='w-4'></div>
          <UserButton/>
        </div>
        </div>
        <div className="h-8"></div>
        <Separator/>
        <div className="h-8"></div>

         {notes.length === 0 &&(
        <div className='text-center'>
          <h2 className='text-xl text-gray-600 '> You have no notes yet.</h2>
        </div>
         )}


{/* display all notes */}
        <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-col-1 gap-3'>
          <CreateNoteDialog/>
          {notes.map(note=>{
            return(
              <a href={`/notebook/${note.id}`} key={note.id}>
              <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                <img
                 className="dahboard-img"
                  alt=""
                  src="https://w0.peakpx.com/wallpaper/888/596/HD-wallpaper-ghibli-studio-anime-black-cat-cats-japan-japanese-magic.jpg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {note.name}
                  </h3>
                  <div className="h-1"></div>
                  <p className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </a>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}
export default DashboardPage;