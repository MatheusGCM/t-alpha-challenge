import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useState } from 'react'

import { getAllProducts } from '@/api/get-all-products'
import { Pagination } from '@/components'
import { DialogButtons } from '@/components/dialog-buttons'
import { TableProducts } from '@/components/table-products'

export function Home() {
  const [orderByPrice, setOrderByPrice] = useState<boolean | null>(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data: products, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  if (isPending || !products) return

  const reversedProducts = products.slice().reverse()

  const productsOrderedByPrice =
    orderByPrice !== null
      ? orderByPrice
        ? reversedProducts.sort((a, b) => a.price - b.price)
        : reversedProducts.sort((a, b) => b.price - a.price)
      : reversedProducts

  const filteredProducts = search
    ? productsOrderedByPrice?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      )
    : productsOrderedByPrice

  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex)
  }

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border bg-transparent p-2 focus-within:border-zinc-500">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nome do produto"
              className="flex-1 bg-transparent outline-none placeholder:text-zinc-400"
            />
            <Search className="size-5 text-zinc-400" />
          </div>
          <DialogButtons />
        </div>

        <TableProducts
          data={currentData}
          handleOrderByPrice={() => setOrderByPrice((prevState) => !prevState)}
        />

        {filteredProducts.length > itemsPerPage && (
          <Pagination
            onPageChange={handlePaginate}
            currentPage={currentPage}
            perPage={5}
            totalCount={products.length}
          />
        )}
      </div>
    </div>
  )
}
