import { api } from '@/lib/axios'

export async function deleteProduct(id: number) {
  await api.delete(`/products/delete-product/${id}`)
}
