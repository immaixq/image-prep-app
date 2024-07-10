import { writeFile } from "fs/promises";
import { join } from "path";
import { arrayBuffer } from "stream/consumers";

export default function ServerUpload() {

    async function upload(data: FormData) {
        'use server'
        
        const file: File | null = data.get('file') as File
        if(!file) {
            throw new Error('No file provided')
                }
        
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join('/', 'tmp', file.name)
        await writeFile(path, buffer)
        console.log(`open ${path} to see image`)
    }

    return (
        <main>
            <h1>
                React Server Componenet: Upload 
            </h1>
            <form action={upload}>
                <input type="file" name="file" />
                <input type="submit" value="Upload"/>
            </form>
        </main>
    )
}