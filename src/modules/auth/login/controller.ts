import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginForm } from './interface'
import { schema } from './schema'
import { useForm, UseFormSetError } from 'react-hook-form'
import { useLogin } from './apiHandler/useLogin'
import { useCallback } from 'react'

export const useLoginController = () => {
  const formHandler = useFormHandler()
  const { watch, setError, handleSubmit } = formHandler

  const { trigger, loading } = useQueryHandler(setError)

  const onSubmit = useCallback(() => {
    handleSubmit(() => {
      const loginValue = watch()
      trigger(loginValue)
    })()
  }, [handleSubmit, trigger, watch])

  return {
    formHandler,
    onSubmit,
    loading,
  }
}

const useQueryHandler = (
  setError: UseFormSetError<ILoginForm>,
) => {
  const { trigger, loading: isLoginLoading } = useLogin({ setError })

  return {
    trigger,
    loading: isLoginLoading,
  }
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
