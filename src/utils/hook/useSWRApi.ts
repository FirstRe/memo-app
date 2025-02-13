import { AxiosError } from 'axios'
import useSWR, { Key, SWRConfiguration } from 'swr'

const useSWRApi = <REQ, RES>(
  key: Key,
  config: SWRConfiguration,
  fetcher: (endpoint: string, request?: REQ) => Promise<RES>,
  request?: REQ,
) => {
  const { data, error, isLoading, mutate } = useSWR<RES, AxiosError<RES>, Key>(
    key,
    (endpoint: string) => fetcher(endpoint, request),
    config,
  )

  return {
    data,
    isLoading,
    error,
    isError: !!error,
    mutate,
  }
}

export default useSWRApi
