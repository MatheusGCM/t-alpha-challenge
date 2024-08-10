import { Outlet } from 'react-router-dom'

import logo from '@/assets/logo-t-alpha.png'

export function AuthLayout() {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <div className="w-[460px] space-y-8">
        <div className="flex justify-center">
          <img src={logo} alt="logo" className="w-52" />
        </div>
        <Outlet />
      </div>
    </div>
  )
}
