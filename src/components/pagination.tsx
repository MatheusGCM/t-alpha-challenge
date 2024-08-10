import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
  currentPage: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => void
}

export function Pagination({
  perPage,
  totalCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-center sm:justify-between">
      <span className="hidden text-sm text-muted-foreground sm:flex">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6">
        <div className="hidden text-sm font-medium sm:flex">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => onPageChange(totalPages)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
