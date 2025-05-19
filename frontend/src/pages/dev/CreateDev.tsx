import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CreateDev() {
   const navigate = useNavigate()
   return (
      <div className="p-4">
         <Button onClick={() => navigate(-1)}>
            <ArrowLeft />
         </Button>
         <h3 className="text-2xl font-bold mb-4">Cadastrar novo desenvolvedor</h3>
      </div>
   )
}
