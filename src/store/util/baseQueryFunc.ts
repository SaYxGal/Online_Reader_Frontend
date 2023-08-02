import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query"
import { logout, setUser } from "../userSlice"
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
  let result = await baseQueryWithAuth(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
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
  return result
}
export const baseQueryCustom = baseQueryWithReauth