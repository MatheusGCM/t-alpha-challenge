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

import { createProduct, CreateProductBody } from '@/api/create-product'
import { queryClient } from '@/lib/react-query'

interface DialogContentProductCreateProps {
  closeDialog: () => void
}

export function DialogContentProductCreate({
  closeDialog,
}: DialogContentProductCreateProps) {
  const { mutateAsync: createProductFn, isPending: isCreatePending } =
    useMutation({
      mutationFn: ({ body }: { body: CreateProductBody }) =>
        createProduct(body),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        closeDialog()
      },
      onError: () => {
        toast.error('Algo deu errado, tente novamente')
      },
    })

  async function onSubmit(formData: ProductDialogFormData) {
    await createProductFn({ body: formData })
  }

  return (
    <DialogContent className="space-y-3">
      <DialogHeader>
        <DialogTitle className="font-bold">Criar produto</DialogTitle>
      </DialogHeader>

      <FormProduct onSubmit={onSubmit} />

      <DialogFooter>
        <Button
          form="formProduct"
          size={'lg'}
          type="submit"
          className="w-full"
          isLoading={isCreatePending}
        >
          Criar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
