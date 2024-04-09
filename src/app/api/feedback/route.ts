import fs from 'fs'
import { NextRequest } from 'next/server'
import path from 'path'

export const dynamic = 'force-dynamic'
export const GET = async (request: NextRequest) => {
  const filePath = buildFeedbackPath()
  return Response.json({ feedbacks: extractFeedback(filePath) })
}

export const POST = async (request: NextRequest) => {
  const dataJSON = await request.json()
  const newFeedback = {
    id: new Date(),
    email: dataJSON.email,
    text: dataJSON.text
  }
  // storing data into a file
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)
  data.push(newFeedback)
  fs.writeFileSync(filePath, JSON.stringify(data))

  return Response.json({ message: 'Success', feedback: newFeedback })
}

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json')
}

export const extractFeedback = (filePath: string) => {
  const fileData: string = fs.readFileSync(filePath)
  return JSON.parse(fileData)
}
