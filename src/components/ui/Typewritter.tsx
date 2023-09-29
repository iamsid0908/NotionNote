"use client";
import React from 'react'
import Typewriter from "typewriter-effect";

type Props = {}

function Typewritter({}: Props) {
  return (
    <Typewriter
    options={{
        loop:true,
    }}
    onInit={(typewriter)=>{
        typewriter.typeString("Superchared productivity").start()
        .pauseFor(1000)
        .deleteAll()
        .typeString("AI-power Insights...").start()
    }}
    />
  )
}

export default Typewritter