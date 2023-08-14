import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query"
import { logout, setUser} from "../userSlice"
import { Mutex } from "async-mutex";
const mutex = new Mutex();
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_QUERY,
  prepareHeaders: async headers => {
    const accessToken = localStorage.getItem('token')
 
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    headers.set('Accept', 'application/json')
    headers.set('Cache-Control', 'no-cache')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')
    return headers
  }
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQueryWithAuth(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try{
        // try to get a new token
      const refreshResult = await baseQueryWithAuth({ url: "/auth/refresh", method: 'POST' }, api, extraOptions)
      if (refreshResult.data) {
        const refeshTokenResult = refreshResult.data as any
        // store the new token
        localStorage.setItem('token', refeshTokenResult.access_token);
        console.log(refeshTokenResult.expires_in)
        // retry the initial query
        result = await baseQueryWithAuth(args, api, extraOptions)
      } else {
        api.dispatch(logout())
      }
      }
      finally {
        // release must be called once the mutex should be released again.
        release()
      }
    }
    else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQueryWithAuth(args, api, extraOptions)
    }
  }
  return result
}
export const baseQueryCustom = baseQueryWithReauth