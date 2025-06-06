import { useState } from "react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { deleteDev } from "@/services/devService"

export default function ConfirmDeleteDevModal({
    devId,
    onClose,
    fetchDevs,
}: {
    devId: Number
    onClose: () => void
    fetchDevs: () => void
}) {
   const [isLoading, setIsLoading] = useState(false)

   const handleConfirmDelete = (id: Number) => {
      setIsLoading(true)
      toast.loading("Deletando...", { id: "loading" })

      deleteDev(id)
         .then(() => {
            toast.success("Desenvolvedor deletado com sucesso!", { id: "loading", duration: 3000 })
            fetchDevs()
            onClose()
         })
         .catch(() => {
            toast.error("Erro ao deletar desenvolvedor.", { id: "loading" })
         })
         .finally(() => {
            setIsLoading(false)
         })
   }

   return (
      <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm text-foreground flex items-center justify-center z-50" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
         <div className="bg-background p-6 rounded shadow-md text-center space-y-4">
               <p>Tem certeza que deseja excluir esse desenvolvedor?</p>
               <div className="flex justify-center gap-4">
                  <Button
                     onClick={onClose}
                     disabled={isLoading}
                     className="px-4 py-2 border rounded text-gray-600 hover:bg-green-100"
                     variant={"secondary"}
                  >
                     Cancelar
                  </Button>
                  <Button 
                     onClick={() => handleConfirmDelete(devId)}
                     disabled={isLoading}
                     variant={"secondary"}
                     className="px-4 py-2 bg-red-500 border rounded hover:bg-red-600"
                  >
                     {isLoading ? "Excluindo..." : "Excluir"}
                  </Button>
               </div>
         </div>
      </motion.div>
   )
}