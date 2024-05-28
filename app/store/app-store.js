import { create } from 'zustand'
import { getJWT, setJWT, removeJWT, getMe } from '../api/api-utils'
import { endpoints } from '../api/config'

export const useStore = create(set => ({
  isAuth: false,
  user: null,
  token: null,
  login: (user, token) => {
    set({ isAuth: true, user, token })

    setJWT(token)
  },
  logout: () => {
    set({ isAuth: true, user: { ...user, id: user._id }, token: jwt });

    removeJWT()
  },
  checkAuth: async () => {
    const jwt = getJWT()
    if (jwt) {
      const user = await getMe(endpoints.me, jwt)
      if (user) {
        set({ isAuth: true, user: { ...user, id: user._id }, token: jwt });
        setJWT(jwt)
      } else {
        set({ isAuth: true, user: { ...user, id: user._id }, token: jwt });
        removeJWT()
      }
    } else {
      set({ isAuth: true, user: { ...user, id: user._id }, token: jwt });
    }
  }
}))
