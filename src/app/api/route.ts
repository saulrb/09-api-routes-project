export const dynamic = 'force-dynamic'

export const GET = async (request: Request) => {
  return Response.json({ message: 'This works!' })
}
