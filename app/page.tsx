'use client'
import { useState } from "react"

export default function Home() {

  const [ files, setFiles ] = useState<FileList>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!files || files.length === 0) return
    
    try {
      const formData = new FormData()

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if(!file) continue
        formData.append('file', file)
      }

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
    <main className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold items-center">Wanderlust Image Preparation Tools</h1>
        <form onSubmit={onSubmit}>
          <input type="file" name="file" multiple onChange={(e) => setFiles(e.target.files || undefined )}/>
          <input className="minimalist-button" type="submit" value="Upload"/>
        </form>
    </main>
  )
}