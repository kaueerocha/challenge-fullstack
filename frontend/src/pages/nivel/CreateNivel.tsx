import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNivel } from "@/services/nivelService"
import { toast } from "sonner"
import { motion } from "framer-motion"

const createNivelSchema = z.object({
  nivel: z.string().min(1, "O nome do nível é obrigatório"),
})

type CreateNivelFormData = z.infer<typeof createNivelSchema>

export default function CreateNivel() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNivelFormData>({
    resolver: zodResolver(createNivelSchema),
  })

  const onSubmit = async (data: CreateNivelFormData) => {
    setIsSubmitting(true)
    toast.loading("Criando nível...", { id: "loading" })

    try {
      await createNivel(data.nivel)
      toast.success("Nível criado com sucesso!", { id: "loading" })
      navigate(-1)
    } catch (error) {
      console.error("Erro ao criar nível:", error)
      toast.error("Erro ao criar nível", { id: "loading" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div className="container mx-auto py-6 px-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between my-6">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h3 className="text-2xl font-bold">Criar Nível</h3>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader className="mb-4">
              <CardTitle>Novo Nível</CardTitle>
              <CardDescription>Crie um novo nível para os desenvolvedores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 mb-4">
              {errors.nivel && <div className="bg-destructive/10 text-destructive p-3 rounded-md">{errors.nivel.message}</div>}

              <div className="space-y-2">
                <Label htmlFor="nivel">Nome do Nível</Label>
                <Input
                  id="nivel"
                  placeholder="Ex: Júnior, Pleno, Sênior"
                  {...register("nivel")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
              <Button variant="secondary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Nível"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </motion.div>
  )
}
