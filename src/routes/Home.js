import React from "react"
import { Logo, Audio } from "../components"
import "./home.css"

import Satori from "../assets/Satori.mp3"
import Mania from "../assets/Mania.mp3"
import Five from "../assets/Five.mp3"

const audioItems = [
  {
    title: "Satori",
    audio: Satori,
  },
  {
    title: "Mania",
    audio: Mania,
  },
  {
    title: "Five",
    audio: Five,
  },
]

export default function Home() {
  return (
    <div className="logo-container">
      <Logo />
      <Audio items={audioItems} />
    </div>
  )
}
