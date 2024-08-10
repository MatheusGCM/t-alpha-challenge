import { Product } from '@/@types/product'
import { api } from '@/lib/axios'

interface ProductsResponse {
  success: boolean
  message: string | null
  data: {
    products: Product[]
  }
}

export async function getAllProducts() {
  const { data } = await api.get<ProductsResponse>('/products/get-all-products')

  return data.data.products
}
