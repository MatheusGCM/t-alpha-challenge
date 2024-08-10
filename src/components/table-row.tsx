import { Ellipsis } from 'lucide-react'
import { useState } from 'react'

import { DialogContentProductUpdate } from './dialog-content-product-update'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'

import { Product } from '@/@types/product'
import { TableCell, TableRow as TR } from '@/components/ui/table'

export function TableRow(product: Product) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { id, name, description, price, stock } = product
  return (
    <TR className="text-center sm:text-left">
      <TableCell className="hidden text-center font-mono text-xs font-medium md:table-cell">
        {id}
      </TableCell>
      <TableCell title={name} className="max-w-[8.25rem] truncate font-medium">
        {name}
      </TableCell>
      <TableCell
        title={description}
        className="hidden max-w-[15rem] truncate sm:table-cell"
      >
        {description}
      </TableCell>
      <TableCell className="hidden text-center font-medium sm:table-cell">
        {`R$ ${price.toFixed(2)}`}
      </TableCell>
      <TableCell className="hidden text-center sm:table-cell">
        {stock}
      </TableCell>
      <TableCell className="text-center sm:table-cell">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="xs" variant="ghost" type="button">
              <Ellipsis className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContentProductUpdate
            product={product}
            closeDialog={() => setIsDialogOpen(false)}
          />
        </Dialog>
      </TableCell>
    </TR>
  )
}
