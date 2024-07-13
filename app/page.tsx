'use client'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};


export default function Home() {

  const [previews, setPreviews] = useState<string[]>([]);
  const [fileData, setFileData] = useState<{ file: File; preview: string }[]>([]);


  useEffect(() => {
    // Clean object urls when component unmounts
    return () => {
      previews.forEach(URL.revokeObjectURL);
    }
  }, [previews]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFileData = Array.from(selectedFiles).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setFileData(prevData => [...prevData, ...newFileData]);
    }
  };

  const removeImage = (index: number) => {
    setFileData(prevData => {
      const newData = [...prevData];
      URL.revokeObjectURL(newData[index].preview);
      newData.splice(index, 1);
      return newData;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (fileData.length === 0) return

    try {
      const formData = new FormData()

      fileData.forEach(({ file }) => {
        formData.append('file', file)
      })

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
    <main className="max-w-4xl mx-auto p-6 sm:p-10">
      <h1 className="text-3xl font-bold items-center mb-8">Wanderlust Image Preparation Tools</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="mb-4" type="file" name="file" multiple onChange={handleFileChange} />
        <input className="minimalist-button" type="submit" value="Upload" />
      </form>
      <motion.div
        className="image-previews"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="image-previews mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {fileData.map((data, index) => (
            <div key={index} className="relative">
              <img
                src={data.preview}
                alt={`Preview ${index + 1}`}
                width={100}
                height={100}
                style={{ objectFit: 'cover' }}
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}