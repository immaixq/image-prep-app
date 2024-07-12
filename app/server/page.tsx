import { writeFile } from "fs/promises";
import { join } from "path";
import { arrayBuffer } from "stream/consumers";

export default function ServerUpload() {
    async function upload(data: FormData) {
        'use server'

        const files: FileList | null = data.getAll('file') as unknown as FileList
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
    }

    return (
        <main className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold items-center">
                React Server Componenet: Upload 
            </h1>
            <form action={upload}>
                <input type="file" name="file" multiple />
                <input type="submit" value="Upload"/>
            </form>
        </main>
    )
}
// export default function ServerUpload() {

//     async function upload(data: FormData) {
//         'use server'
        
//         const file: File | null = data.get('file') as File
//         if(!file) {
//             throw new Error('No file provided')
//                 }
        
//         const bytes = await file.arrayBuffer()
//         const buffer = Buffer.from(bytes)

//         const path = join('/', 'tmp', file.name)
//         await writeFile(path, buffer)
//         console.log(`open ${path} to see image`)
//     }

//     return (
//         <main className="max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold items-center">
//                 React Server Componenet: Upload 
//             </h1>
//             <form action={upload}>
//                 <input type="file" name="file" />
//                 <input type="submit" value="Upload"/>
//             </form>
//         </main>
//     )
// }