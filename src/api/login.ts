import { api } from '@/lib/axios'

interface LoginBody {
  taxNumber: string
  password: string
}

interface LoginResponse {
  success: boolean
  message: string
  data: { token: string } | null
}

export async function login(body: LoginBody) {
  const { data } = await api.post<LoginResponse>('/auth/login', body)

  return data.data
}
