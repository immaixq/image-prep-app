import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { writeFile } from 'fs/promises'

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const files: FileList | null = formData.getAll('file') as unknown as FileList
    if(!files || files.length === 0) {
        throw new Error('No file provided')
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if(!file) continue
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const path = join('/', 'tmp', file.name)
        await writeFile(path, buffer)
        console.log(`open ${path} to see image`)
    }

    return NextResponse.json({ success: true })
}