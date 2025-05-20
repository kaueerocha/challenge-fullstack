import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { updateNivel } from "@/services/nivelService"

const schema = z.object({
  nivel: z.string().min(1, "O nome do nível é obrigatório"),
})

type EditNivelFormData = z.infer<typeof schema>

type Props = {
  initialNivel: { id: Number; nivel: string }
  onClose: () => void
  fetchNiveis: () => void
}

export function EditNivelModal({ initialNivel, onClose, fetchNiveis }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditNivelFormData>({
    resolver: zodResolver(schema),
    defaultValues: { nivel: initialNivel.nivel },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: EditNivelFormData) => {
    setIsSubmitting(true)
    toast.loading("Atualizando nível...", { id: "edit-loading" })

    try {
      await updateNivel(initialNivel.id, data.nivel)
      toast.success("Nível atualizado com sucesso!", { id: "edit-loading" })
      fetchNiveis()
      onClose()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao atualizar nível", { id: "edit-loading" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar Nível</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nivel">Nome do Nível</Label>
              <Input id="nivel" {...register("nivel")} />
              {errors.nivel && <p className="text-sm text-red-500">{errors.nivel.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="secondary" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
