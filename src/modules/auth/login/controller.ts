import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginForm } from './interface'
import { schema } from './schema'
import { useForm, UseFormSetError } from 'react-hook-form'
import { useLogin } from './apiHandler/useLogin'
import { LoginRequest } from '@/types/api/auth/interfact'
import { useCallback } from 'react'

export const useLoginController = () => {
  const formHandler = useFormHandler()
  const { getValues, setError, handleSubmit } = formHandler

  const loginValue = getValues()
  const { fetcher, loading } = useQueryHandler(
    {
      username: loginValue.username,
      password: loginValue.password,
    },
    setError,
  )

  const onSubmit = useCallback(() => {
    handleSubmit(fetcher)()
  }, [])

  return {
    formHandler,
    onSubmit,
    loading,
  }
}

const useQueryHandler = (
  request: LoginRequest,
  setError: UseFormSetError<ILoginForm>,
) => {
  const { fetcher, loading: isLoginLoading } = useLogin({ request, setError })
  return { fetcher, loading: isLoginLoading }
}

export const useFormHandler = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
    mode: 'all',
  })

  return {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    watch,
    getValues,
    setError,
    clearErrors,
    setValue,
  } as any
}
