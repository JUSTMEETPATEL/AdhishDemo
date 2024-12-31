'use client'

import { useEffect, useState } from 'react'

export default function FileList() {
  const [files, setFiles] = useState<string[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setFiles(data.files)
    } catch (error) {
      setError('Failed to fetch files')
    }
  }

  const downloadFile = async (filename: string) => {
    window.open(`/api/files/${filename}`, '_blank')
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file} className="flex items-center justify-between p-2 border rounded">
            <span>{file}</span>
            <button
              onClick={() => downloadFile(file)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}