import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Layers } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function Home() {
   const navigate = useNavigate()
   return (
      <motion.div className="container align-center mx-auto py-8 px-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
         <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
               <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao Sistema</h1>
               <p className="text-muted-foreground mt-2">Selecione uma das opções abaixo para continuar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/dev')}>
                  <CardHeader className="text-center">
                     <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                        <Code className="h-7 w-7 text-primary" />
                     </div>
                     <CardTitle>Desenvolvedores</CardTitle>
                     <CardDescription>Gerencie os desenvolvedores do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                     <Button variant={'secondary'} className="w-full">Acessar Desenvolvedores</Button>
                  </CardContent>
               </Card>

               <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/nivel')}>
                  <CardHeader className="text-center">
                     <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                        <Layers className="h-7 w-7 text-primary" />
                     </div>
                     <CardTitle>Níveis</CardTitle>
                     <CardDescription>Gerencie os níveis de desenvolvedores</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                     <Button variant={'secondary'} className="w-full">Acessar Níveis</Button>
                  </CardContent>
               </Card>
            </div>
         </div>
      </motion.div>
  )
}
