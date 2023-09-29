'use client'
import Typewritter from "@/components/ui/Typewritter"
import {Button} from "../components/ui/button"
import "./globals.css"
import {ArrowRight} from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className='bg-gradient-to-r min-h-screen from-rose-100 to-teal-100'> 
    <div className='w-screen h-screen flex flex-col items-center justify-center '>
      <h1 className='font-semibold text-center text-7xl ' >
        AI 
        <span className="text-green-600 font-bold">
        <br/>note taking <br/>
        </span>
         assistent
      </h1>

      <div className="mt-4">
        <h2 className="font-semibold text-3xl text-center text-slate-700" >
          <Typewritter/>
          
          </h2>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button className="bg-green-600">Get Started
              <ArrowRight className=" ml-2 w-5 h-5"/>
              </Button>
            </Link>
          </div>
      </div>
      
    </div>
    </div>
   </>
  )
}
