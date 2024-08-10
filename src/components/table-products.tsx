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
            <TableHead className="hidden w-[8.25rem] md:table-cell">
              Identificador
            </TableHead>
            <TableHead className="w-[8.25rem]">Nome</TableHead>
            <TableHead className="hidden w-[15rem] sm:table-cell">
              Descrição
            </TableHead>
            <TableHead className="hidden w-[8.25rem] sm:table-cell">
              <Button variant="ghost" onClick={handleOrderByPrice}>
                <span>Preço</span>
                <ArrowUpDown className="ml-2 inline h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden w-[8.25rem] text-center sm:table-cell">
              Estoque
            </TableHead>
            <TableHead className="hidden w-[8.25rem] sm:table-cell"></TableHead>
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
