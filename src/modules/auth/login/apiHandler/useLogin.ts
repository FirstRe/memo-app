import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import useSWRMutation from 'swr/mutation'
import { defaultTo } from 'lodash'
import { UseFormSetError } from 'react-hook-form'
import { ILoginForm } from '../interface'
import { CookiesKey, StorageKey } from '@/constant'

interface IUseLoginProps {
  setError: UseFormSetError<ILoginForm>
}

export const useLogin = ({ setError }: IUseLoginProps) => {
  const router = useRouter()

  const fetchLogin = (
    url: string,
    { arg }: { arg: { username: string; password: string } },
  ) => axios.serviceApi.post(url, arg)

  const { trigger, isMutating, error } = useSWRMutation(
    '/auth/login',
    fetchLogin,
    {
      onSuccess({ data }) {
        if (data.status.code !== 1000) {
          setError('password', {
            message: data.status.message,
          })
        } else {
          const storageItems = {
            accessToken: defaultTo(data.data?.token, ''),
            userId: defaultTo(data.data?.user.id, ''),
            userRole: defaultTo(data.data?.user.role, ''),
            email: defaultTo(data.data?.user.email, ''),
          }
          Object.entries(storageItems).forEach(([key, value]) => {
            if (CookiesKey[key as keyof typeof CookiesKey]) {
              Cookies.set(CookiesKey[key as keyof typeof CookiesKey], value)
            }
          })

          Object.entries(storageItems).forEach(([key, value]) => {
            if (StorageKey[key as keyof typeof StorageKey]) {
              localStorage.setItem(
                StorageKey[key as keyof typeof StorageKey],
                value,
              )
            }
          })
          router.push('/')
        }
      },
    },
  )

  return {
    trigger,
    loading: isMutating,
  }
}
