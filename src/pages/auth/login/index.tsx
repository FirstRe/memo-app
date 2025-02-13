import { CookiesKey } from '@/constant'
import LoginPage from '@/modules/auth/login/Container'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Request, Response } from 'express'
import { deleteCookie } from 'cookies-next'
import { mockVerifyToken } from '@/adapter/mockVerifyToken'

export default function Container() {
  return <LoginPage />
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) {
  const logPrefix = '[pages.login.getServerSideProps]'
  const req = ctx.req as Request
  const res = ctx.res as Response
  const accessToken = req.cookies[CookiesKey.accessToken]
  const code = ctx.query.code as string
  const sessionState = ctx.query.session_state as string

  console.log(logPrefix, { accessToken, code, sessionState })
  try {
    if (accessToken) {
      const { status } = mockVerifyToken(accessToken)
      if (status !== 200) {
        deleteCookie(CookiesKey.accessToken, { res, req })
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }

    return {
      props: {},
    }
  } catch (e) {
    return {
      props: {
        errorCode: 500,
      },
    }
  }
}
