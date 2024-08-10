import { ArrowUpDown } from 'lucide-react'

import { TableRow } from './table-row'
import { Button } from './ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow as TR,
} from './ui/table'

import { Product } from '@/@types/product'

interface TableProductsProps {
  data: Product[]
  handleOrderByPrice: () => void
}

export function TableProducts({
  data,
  handleOrderByPrice,
}: TableProductsProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TR>
            <TableHead className="hidden md:table-cell md:w-[8.25rem]">
              Identificador
            </TableHead>
            <TableHead className="text-center md:w-[8.25rem] md:text-left">
              Nome
            </TableHead>
            <TableHead className="hidden sm:table-cell md:w-[15rem]">
              Descrição
            </TableHead>
            <TableHead className="hidden sm:table-cell md:w-[8.25rem]">
              <Button variant="ghost" onClick={handleOrderByPrice}>
                <span>Preço</span>
                <ArrowUpDown className="ml-2 inline h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden text-center sm:table-cell md:w-[8.25rem]">
              Estoque
            </TableHead>
            <TableHead className="md:w-[8.25rem]"></TableHead>
          </TR>
        </TableHeader>
        <TableBody>
          {data.map((product) => {
            return <TableRow {...product} key={`${product.id}`} />
          })}
        </TableBody>
      </Table>
    </div>
  )
}
