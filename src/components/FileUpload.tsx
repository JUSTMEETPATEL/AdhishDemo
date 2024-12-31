"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import dynamic from 'next/dynamic';

const FileList = dynamic(() => import('@/components/FileList'), {
  ssr: false
});

export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('file', file));

      const response = await fetch('/api/upload', { 
        method: 'POST', 
        body: formData 
      });

      if (!response.ok) throw new Error('Upload failed');
      
      setUploadStatus("Success!");
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      setUploadStatus(`Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 mt-36 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
      <FileUpload onChange={handleFileUpload} />
      {uploading && <p className="text-center mt-4">Uploading...</p>}
      {uploadStatus && <p className="text-center mt-4">{uploadStatus}</p>}
      <FileList key={refreshKey} />
    </div>
  );
}