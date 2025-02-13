import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { defaultTo } from 'lodash'
import { ILoginForm } from '../interface'
import { CookiesKey, StorageKey } from '@/constant'
import { useCallback } from 'react'
import { repos } from '@/utils/mock'

interface IUseLoginProps {}

export const useLogin = ({}: IUseLoginProps) => {
  const router = useRouter()

  const trigger = useCallback(({ username, password }: ILoginForm) => {
    const data = repos.users.find((e) => e.username === username)
    const storageItems = {
      accessToken: defaultTo(data?.token, ''),
      userId: defaultTo(data?.id, ''),
      userRole: defaultTo(data?.role, ''),
      email: defaultTo(data?.email, ''),
    }
    Object.entries(storageItems).forEach(([key, value]) => {
      if (CookiesKey[key as keyof typeof CookiesKey]) {
        Cookies.set(CookiesKey[key as keyof typeof CookiesKey], value)
      }
    })

    Object.entries(storageItems).forEach(([key, value]) => {
      if (StorageKey[key as keyof typeof StorageKey]) {
        localStorage.setItem(StorageKey[key as keyof typeof StorageKey], value)
      }
    })
    router.replace('/')
  }, [])

  // const fetchLogin = (
  //   url: string,
  //   { arg }: { arg: { username: string; password: string } },
  // ) => axios.serviceApi.post(url, arg)

  // const { trigger, isMutating, error } = useSWRMutation(
  //   '/auth/login',
  //   fetchLogin,
  //   {
  //     onSuccess({ data }) {
  //       if (data.status.code !== 1000) {
  //         setError('password', {
  //           message: data.status.message,
  //         })
  //       } else {
  //         const storageItems = {
  //           accessToken: defaultTo(data.data?.token, ''),
  //           userId: defaultTo(data.data?.user.id, ''),
  //           userRole: defaultTo(data.data?.user.role, ''),
  //           email: defaultTo(data.data?.user.email, ''),
  //         }
  //         Object.entries(storageItems).forEach(([key, value]) => {
  //           if (CookiesKey[key as keyof typeof CookiesKey]) {
  //             Cookies.set(CookiesKey[key as keyof typeof CookiesKey], value)
  //           }
  //         })

  //         Object.entries(storageItems).forEach(([key, value]) => {
  //           if (StorageKey[key as keyof typeof StorageKey]) {
  //             localStorage.setItem(
  //               StorageKey[key as keyof typeof StorageKey],
  //               value,
  //             )
  //           }
  //         })
  //         router.push('/')
  //       }
  //     },
  //   },
  // )

  return {
    trigger,
    loading: false,
  }
}
