import { api } from '@/lib/axios'

export interface UpdateProductBody {
  name: string
  description: string
  price: number
  stock: number
}

export async function updateProduct(id: number, body: UpdateProductBody) {
  await api.patch(`/products/update-product/${id}`, body)
}
