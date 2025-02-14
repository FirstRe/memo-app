import { CookiesKey } from '@/constant'
import Axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'
import Cookies from 'js-cookie'

const authRequestInterceptor = (axiosConfig: AxiosRequestConfig) => {
  const token = Cookies.get(CookiesKey.accessToken)
  const userId = Cookies.get(CookiesKey.userId)

  const headers: Record<any, any> = {
    'content-type':
      axiosConfig?.headers?.['content-type'] || 'application/json',
    'accept-language': 'EN',
  }

  if (token) headers.authorization = `Bearer ${token}`
  if (userId) headers['user-id'] = userId

  return {
    ...axiosConfig,
    headers,
  }
}

const serviceApi = Axios.create({
  baseURL: `/api`,
})

serviceApi.interceptors.request.use(authRequestInterceptor)

const axios = {
  serviceApi,
}

export default axios
