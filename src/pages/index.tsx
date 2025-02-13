import { checkToken } from '@/adapter'
import { CookiesKey } from '@/constant'
import { deleteCookie } from 'cookies-next'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Request, Response } from 'express'
import Container from '@/modules/auth/main/Container'
import { mockVerifyToken } from '@/adapter/mockVerifyToken'

const HomePage: NextPage = () => {
  return <Container />
}

export default HomePage

export async function getServerSideProps(
  ctx: GetServerSidePropsContext<ParsedUrlQuery>,
) {
  const logPrefix = '[pages.home.getServerSideProps]'
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
        return {
          redirect: {
            destination: '/auth/login',
            permanent: false,
          },
        }
      } else {
        return {
          props: {},
        }
      }
    } else {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      }
    }
  } catch (e) {
    return {
      props: {
        errorCode: 500,
      },
    }
  }
}
