import Axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'
import Cookies from 'js-cookie'

const authRequestInterceptor = (axiosConfig: AxiosRequestConfig) => {
  const token = Cookies.get('token')

  const headers: Record<any, any> = {
    'content-type':
      axiosConfig?.headers?.['content-type'] || 'application/json',
    'accept-language': 'EN',
  }

  if (token) headers.authorization = `Bearer ${token}`

  return {
    ...axiosConfig,
    headers,
  }
}

const serviceApi = Axios.create({
  baseURL: '/api',
})

serviceApi.interceptors.request.use(authRequestInterceptor)

const axios = {
  serviceApi,
}

export default axios
