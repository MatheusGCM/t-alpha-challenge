import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { FormProduct, ProductDialogFormData } from './form-product'
import { Button } from './ui/button'
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

import { Product } from '@/@types/product'
import { deleteProduct } from '@/api/delete-product'
import { updateProduct, UpdateProductBody } from '@/api/update-product'
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
import { queryClient } from '@/lib/react-query'

interface DialogContentProductUpdateProps {
  product: Product
  closeDialog: () => void
}

export function DialogContentProductUpdate({
  product,
  closeDialog,
}: DialogContentProductUpdateProps) {
  const { mutateAsync: updateProductFn, isPending: isUpdatePending } =
    useMutation({
      mutationFn: ({ id, body }: { id: number; body: UpdateProductBody }) =>
        updateProduct(id, body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        closeDialog()
      },
      onError: () => {
        toast.error('Algo deu errado, tente novamente')
      },
    })
  const { mutateAsync: deleteProductFn, isPending: isDeletePending } =
    useMutation({
      mutationFn: ({ id }: { id: number }) => deleteProduct(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        closeDialog()
      },
      onError: () => {
        toast.error('Algo deu errado, tente novamente')
      },
    })

  async function onSubmit(formData: ProductDialogFormData) {
    await updateProductFn({ id: product.id, body: formData })
  }

  async function handleProductDelete() {
    await deleteProductFn({ id: product.id })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-bold">
          Atualizar/Deletar produto
        </DialogTitle>
      </DialogHeader>

      <FormProduct onSubmit={onSubmit} product={product} />

      <DialogFooter className="mt-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={'lg'}
              variant="outline"
              type="button"
              className="w-full"
              isLoading={isDeletePending}
            >
              Deletar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-96">
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o
                produto.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleProductDelete}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          form="formProduct"
          size={'lg'}
          type="submit"
          className="w-full"
          isLoading={isUpdatePending}
        >
          Atualizar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
