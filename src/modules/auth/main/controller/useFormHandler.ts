import { yupResolver } from '@hookform/resolvers/yup'
import { Resolver, useForm } from 'react-hook-form'
import { IMemoForm } from '../interface'
import { schema } from './schema'

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
  } = useForm<IMemoForm>({
    defaultValues: {
      memo: [],
    },
    resolver: yupResolver(schema) as unknown as Resolver<IMemoForm, any>,
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
  }
}
