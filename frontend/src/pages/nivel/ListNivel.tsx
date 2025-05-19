import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Loader, Plus, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getNivel, type Nivel } from "@/services/nivelService"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ConfirmDeleteNivelModal from "./components/ConfirmDeleteNivelModal"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function ListNivel() {
   const navigate = useNavigate()
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(true)
   const [niveis, setNiveis] = useState<Nivel[]>([])
   const [confirmDeleteId, setConfirmDeleteId] = useState<Number | null>(null)

   useEffect(() => {
      setIsLoading(true)
      getNivel()
      .then(setNiveis)
      .catch(() => setError('Erro ao carregar níveis'))
      .finally(() => setIsLoading(false))
   }, [])

  
   const fetchNiveis = () => {
      setIsLoading(true)
      getNivel()
         .then((data) => setNiveis(data))
         .catch(() => toast.error("Erro ao carregar níveis"))
         .finally(() => setIsLoading(false))
   }

   // Delete Nivel
   const handleDeleteClick = (id: Number) => {
      setConfirmDeleteId(id)
   }

   // Edit Nivel
   const handleEditClick = (nivel: Nivel) => {
      // setEditNivel(nivel);
   }


   if (isLoading) {
      return (
         <div className="text-center">
            <Loader className="animate-spin w-12 h-12" />
         </div>
      )
   }

   return (
      <motion.div className="container mx-auto py-6 px-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
         <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between my-6">
               <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={() => navigate(-1)}>
                     <ArrowLeft />
                  </Button>
                  <h3 className="text-2xl font-bold">Níveis</h3>
               </div>

               <Button variant="secondary" onClick={() => navigate('/nivel/create')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Nível
               </Button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Table>
               <TableCaption>Lista de níveis de desenvolvedores</TableCaption>
               <TableHeader>
                  <TableRow>
                     <TableHead className="w-80">Nome</TableHead>
                     <TableHead>Id</TableHead>
                     <TableHead>Devs Associados</TableHead>
                     <TableHead className="w-20 text-center">Ações</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {niveis.map((nivel, id) => (
                     <TableRow key={id}>
                        <TableCell>{nivel.nivel}</TableCell>
                        <TableCell>{nivel.id}</TableCell>
                        <TableCell>{nivel.countDevs}</TableCell>
                        <TableCell className="text-center">
                           <div className="flex items-center justify-end gap-2">
                              <button
                                 // onClick={() => handleEditClick(nivel)}
                                 className="bg-white-500 hover:bg-blue-400 text-foreground rounded-full p-2 flex items-center justify-center transition-colors"
                              >
                                 <Edit className="w-4 h-4" />
                              </button>
                              <button
                                 onClick={() => handleDeleteClick(nivel.id)}
                                 className="bg-white-500 hover:bg-red-600 text-foreground rounded-full p-2 flex items-center justify-center transition-colors"
                              >
                                 <Trash className="w-4 h-4" />
                              </button>
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>

            {confirmDeleteId && (
               <ConfirmDeleteNivelModal
                  nivelId={confirmDeleteId}
                  onClose={() => setConfirmDeleteId(null)}
                  fetchNiveis={fetchNiveis}
               />
            )}
         </div>
      </motion.div>
   )
}
