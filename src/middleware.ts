import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { checkToken } from './adapter'
// import * as jwt from 'jsonwebtoken'

export async function middleware(req: NextRequest) {
  try {
    const protectedPaths = ['/api/memo']

    const url = req.nextUrl.pathname
    console.log('middleawre', { url })

    const res = NextResponse.next()

    res.headers.append('Access-Control-Allow-Credentials', 'true')
    res.headers.append('Access-Control-Allow-Origin', '*')
    res.headers.append(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT',
    )
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    )

    if (protectedPaths.some((path) => url.startsWith(path))) {
      const authorizationHeader = req.headers.get('authorization')

      if (!authorizationHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }

      const accessToken = authorizationHeader?.replace('Bearer ', '') ?? ''

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin
      const validateUrl = `${baseUrl}/api/auth/validateToken`

      const { data, status } = await checkToken(validateUrl, accessToken)

      if (!accessToken) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
      // const response = NextResponse.next()

      const id = data.data.id

      return res
    }

    return res
  } catch (error) {
    const loginUrl = new URL('/auth/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/api/memo/:path*', '/'],
  // runtime: 'experimental-edge',
}
