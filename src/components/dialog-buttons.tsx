import { LogOut, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DialogContentProductCreate } from './dialog-content-product-create'
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'

export function DialogButtons() {
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem('@t-alpha:token')
    navigate('/sign-in', { replace: true })
  }
  return (
    <div className="ml-auto flex space-x-3">
      <AlertDialog>
        <AlertDialogTrigger asChild className="hidden sm:flex">
          <Button variant="outline">Sair</Button>
        </AlertDialogTrigger>
        <AlertDialogTrigger asChild className="sm:hidden">
          <Button variant="outline" size={'icon'}>
            <LogOut className="size-5" />
          </Button>
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
            <AlertDialogAction onClick={handleLogout}>Sim</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild className="hidden sm:flex">
          <Button>Criar produto</Button>
        </DialogTrigger>
        <DialogTrigger asChild className="sm:hidden">
          <Button size={'icon'}>
            <Plus className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContentProductCreate
          closeDialog={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </div>
  )
}
