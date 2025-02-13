import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { checkToken } from './adapter'
// import * as jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest) {
  try {
    const protectedPaths = ['/api/memo']

    const url = req.nextUrl.pathname
    console.log('middleawre', { url })

    if (protectedPaths.some((path) => url.startsWith(path))) {
      const authorizationHeader = req.headers.get('authorization')

      if (!authorizationHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }

      const accessToken = authorizationHeader?.replace('Bearer ', '') ?? ''

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin
      const validateUrl = `${baseUrl}/api/auth/validateToken`

      const { data, status } = await checkToken(validateUrl, accessToken)

      if (status !== 200) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
      const response = NextResponse.next()

      const id = data.data.id

      response.headers.set('x-user', id)

      return response
    }

    return NextResponse.next()
  } catch (error) {
    const loginUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/api/memo/:path*', '/'],
  // runtime: 'experimental-edge',
}
