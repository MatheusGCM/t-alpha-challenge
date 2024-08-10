import { QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { queryClient } from './lib/react-query'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { Home } from './pages/app/home'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          classNames: {
            error: 'text-red-500',
            success: 'text-green-500',
          },
        }}
      />
    </QueryClientProvider>
  )
}
