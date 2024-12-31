import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Save file to public directory
    const filePath = path.join(process.cwd(), 'public', 'uploads', file.name)
    await writeFile(filePath, buffer)
    
    return NextResponse.json(
      { message: 'File uploaded successfully', fileName: file.name },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}