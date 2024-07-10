import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { writeFile } from 'fs/promises'

export async function POST(request: NextRequest) {
    const formData = await request.formData()
    const file: File | null = formData.get('file') as File

    if(!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join('/', 'tmp', file.name)
    await writeFile(path, buffer)
    console.log(`open ${path}`)

    return NextResponse.json({ success: true })
}