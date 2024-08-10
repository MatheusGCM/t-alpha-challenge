import { api } from '@/lib/axios'

export interface CreateProductBody {
  name: string
  description: string
  price: number
  stock: number
}

export async function createProduct(body: CreateProductBody) {
  await api.post('/products/create-product', body)
}
