import { authKey } from '@/constants/storageKey'
import { getNewAccessToken, removeUserInfo, storeUserInfo } from '@/services/auth.service'
import { ResponseSuccessType } from '@/types'
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage'
import axios from 'axios'
import { Mutex } from 'async-mutex'
const mutex = new Mutex()

const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers['Accept'] = 'application/json'
instance.defaults.timeout = 60000

instance.interceptors.request.use(
  async function (config) {
    if (mutex.isLocked()) {
      return config
    }
    const release = await mutex.acquire()
    try {
      const accessToken = getFromLocalStorage(authKey)
      if (accessToken) {
        config.headers.Authorization = accessToken
      }
      return config
    } finally {
      release()
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  // @ts-ignore
  async function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    }
    return responseObject
  },
  async function (error) {
    const config = error?.config
    if (error?.response?.status === 401) {
      const release = await mutex.acquire()
      try {
        const response = await getNewAccessToken()
        const accessToken = response?.data?.accessToken
        if (accessToken) {
          config.headers.Authorization = accessToken
          setToLocalStorage(authKey, accessToken)
          storeUserInfo({ accessToken: accessToken })
          return instance(config)
        } else {
          return Promise.reject(error)
        }
      } catch (error) {
        removeUserInfo(authKey)
      } finally {
        release()
      }
    } else {
      return Promise.reject(error)
    }
  }
)

export { instance }
