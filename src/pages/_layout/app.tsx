import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import logo from '@/assets/logo-t-alpha.png'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status

          if (status === 401) {
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="mx-auto flex w-[56.25rem] flex-col items-center justify-center space-y-3">
      <header className="mt-5 flex">
        <img src={logo} alt="logo" className="w-52" />
      </header>

      <Outlet />
    </div>
  )
}
