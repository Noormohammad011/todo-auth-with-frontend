import { authKey } from '@/constants/storageKey'
import { getNewAccessToken, removeUserInfo } from '@/services/auth.service'
import { ResponseSuccessType } from '@/types'
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage'
import axios from 'axios'
const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers['Accept'] = 'application/json'
instance.defaults.timeout = 60000

instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey)
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    }
    return responseObject
  },
  async function (error) {
    if (error.response) {
      const config = error?.config
      if (
        error.response.status === 401 &&
        error.response.data.message === 'jwt expired' &&
        !config._retry
      ) {
        config._retry = true
        try {
          const response = await getNewAccessToken()
          const accessToken = response?.data?.accessToken
          if (accessToken) {
            config.headers.Authorization = accessToken
            setToLocalStorage(authKey, accessToken)
            return instance(config)
          }
          return 
        } catch (_error) {
          removeUserInfo(authKey)
          return window.location.href = '/login' || Promise.reject(_error)
        }
      }
      return Promise.reject(error)
    }
  }
)

export { instance }
