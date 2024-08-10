import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getAllProducts } from '@/api/get-all-products'
import { Pagination } from '@/components'
import { DialogContentProductCreate } from '@/components/dialog-content-product-create'
import { TableProducts } from '@/components/table-products'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export function Home() {
  const navigate = useNavigate()
  const [orderByPrice, setOrderByPrice] = useState<boolean | null>(null)
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: products, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  if (isPending || !products) return

  const reversedProduct = products.slice().reverse()

  const productsOrderedByPrice =
    orderByPrice !== null
      ? orderByPrice
        ? reversedProduct.sort((a, b) => a.price - b.price)
        : reversedProduct.sort((a, b) => b.price - a.price)
      : reversedProduct

  const filteredProducts = search
    ? productsOrderedByPrice?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      )
    : productsOrderedByPrice

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex)
  }

  function handleLogout() {
    localStorage.removeItem('@t-alpha:token')
    navigate('/sign-in', { replace: true })
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
          <div className="ml-auto space-x-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Sair</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-96">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar saída</AlertDialogTitle>
                  <AlertDialogDescription>
                    Você está prestes a encerrar sua sessão. Deseja continuar?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Não</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>
                    Sim
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Criar produto</Button>
              </DialogTrigger>
              <DialogContentProductCreate
                closeDialog={() => setIsDialogOpen(false)}
              />
            </Dialog>
          </div>
        </div>

        <TableProducts
          data={currentData}
          handleOrderByPrice={() => setOrderByPrice((prevState) => !prevState)}
        />

        {filteredProducts.length > 5 && (
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
