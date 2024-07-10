'use client'
import { useState } from "react"

export default function Home() {

  const [ file, setFile ] = useState<File>()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) throw new Error(await res.text())
      
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <h1 className="text-3xl font-bold">Wanderlust Image Preparation Tools</h1>
      <form onSubmit={onSubmit}>
        <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])}/>
        <input type="submit" value="Upload"/>
      </form>
    </main>
  )
}