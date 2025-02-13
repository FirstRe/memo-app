import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import useSWRMutation from 'swr/mutation'
import { defaultTo } from 'lodash'
import { UseFormSetError } from 'react-hook-form'
import { ILoginForm } from '../interface'
import { CookiesKey } from '@/constant'

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
          Cookies.set(CookiesKey.accessToken, defaultTo(data.data?.token, ''))
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
