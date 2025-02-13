import useSWR from 'swr'
import { useFormHandler } from './useFormHandler'
import axios from '@/lib/axios'
import { useFieldArray, UseFormSetValue } from 'react-hook-form'
import { IMemo, IMemoForm } from '../interface'
import { CookiesKey, StorageKey } from '@/constant'
import { defaultTo } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IMemoResponse } from '@/types/api/memo/interface'
import useSWRMutation from 'swr/mutation'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { mockGetMemo } from '@/adapter/mockGetMemo'
import { mockUpsertMemo } from '@/adapter/mockUpsert'

export const useMainController = () => {
  const router = useRouter()
  const formHandler = useFormHandler()
  const { setValue, watch, control, handleSubmit } = formHandler

  const { fields, append } = useFieldArray({
    control,
    name: 'memo',
  })
  const {
    userId,
    userRole,
    userEmail,
    isEnableAdd,
    setIsEnableAdd,
    isShowNew,
    setIsShowNew,
  } = useGlobalHandler()

  const { fetchUpsertMemo } = useQueryHandler(setValue, userId)

  const onAddNew = useCallback(() => {
    setIsEnableAdd(false)
    setIsShowNew(false)
    const findMemo = fields.filter((e) => e.userId === userId)
    const data: IMemo = {
      id: '',
      memo: '',
      userId: defaultTo(userId, ''),
      index: findMemo.length + 1,
      user: {
        role: defaultTo(userRole, ''),
      },
      isNew: true,
    }
    append(data)
  }, [append, fields, setIsEnableAdd, setIsShowNew, userId, userRole])

  const onSave = useCallback(
    (memo: IMemo) => {
      fetchUpsertMemo(memo.memo, memo.index)
      setIsEnableAdd(true)
      setIsShowNew(true)
    },
    [setIsEnableAdd, setIsShowNew],
  )

  const onSubmit = useCallback(
    (memo: IMemo) => {
      handleSubmit(() => {
        onSave(memo)
      })()
    },
    [handleSubmit, onSave],
  )
  const onLogout = useCallback(() => {
    Cookies.remove(CookiesKey.accessToken)
    Cookies.remove(CookiesKey.email)
    Cookies.remove(CookiesKey.userId)
    Cookies.remove(CookiesKey.userRole)
    localStorage.clear()
    router.push('/auth/login')
  }, [router])

  const current = useMemo(() => fields.filter((e) => !e.isNew).length, [fields])
  const newValue = useMemo(
    () => fields.length - current,
    [current, fields.length],
  )

  const memo = watch('memo')
  return {
    memo,
    formHandler,
    onAddNew,
    onSubmit,
    onLogout,
    userEmail,
    isEnableAdd,
    current,
    newValue,
    isShowNew,
    userRole,
  }
}

const useQueryHandler = (
  setValue: UseFormSetValue<IMemoForm>,
  userId: string | null,
) => {
  const fetch = useCallback(() => {
    const { data, status } = mockGetMemo(defaultTo(userId, ''))
    if (status === 200 && data !== null) {
      setValue('memo', mapMemo(data))
    }
  }, [userId])

  useEffect(() => {
    fetch()
  }, [fetch])

  const fetchMemo = useCallback(
    (memo: string, index: number) => {
      mockUpsertMemo(defaultTo(userId, ''), memo, index)
      fetch()
    },
    [userId, fetch],
  )

  // const fetchGetMemo = (url: string) => axios.serviceApi.get(url)

  // const { isLoading: isLoadingGetMemo, mutate } = useSWR(
  //   '/memo/getMemo',
  //   (endpoint: string) => fetchGetMemo(endpoint),
  //   {
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //     onSuccess({ data }) {
  //       setValue('memo', mapMemo(data.data))
  //     },
  //   },
  // )

  // const fetchSaveMemo = (
  //   url: string,
  //   { arg }: { arg: { memo: string; index: number } },
  // ) => axios.serviceApi.post(url, arg)

  // const { trigger, isMutating } = useSWRMutation(
  //   '/memo/upsertMemo',
  //   fetchSaveMemo,
  //   {
  //     onSuccess() {
  //       // mutate()
  //     },
  //   },
  // )

  return {
    isLoading: false,
    mutate: fetch,
    // mutate,
    fetchUpsertMemo: fetchMemo,
  }
}

const mapMemo = (data: IMemoResponse[]): IMemo[] => {
  return data?.map((d) => {
    return {
      ...d,
      isNew: false,
    }
  })
}

const useGlobalHandler = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isEnableAdd, setIsEnableAdd] = useState<boolean>(true)
  const [isShowNew, setIsShowNew] = useState<boolean>(false)

  useEffect(() => {
    setUserId(localStorage.getItem(StorageKey.userId))
    setUserRole(localStorage.getItem(StorageKey.userRole))
    setUserEmail(localStorage.getItem(StorageKey.email))
  }, [setUserId, setUserRole, setUserEmail])

  return {
    userId,
    userRole,
    userEmail,
    isEnableAdd,
    setIsEnableAdd,
    isShowNew,
    setIsShowNew,
  }
}
