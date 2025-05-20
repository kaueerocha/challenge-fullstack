import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileWarning } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      className="container align-center mx-auto py-8 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8 }}
    >
      <div className="max-w-3xl mx-auto">
        <Card className="hover:shadow-lg transition-all cursor-pointer">
          <div className="text-center">
            <h3 className="text-3xl font-bold tracking-tight">
              Página não encontrada
            </h3>
            <CardHeader className="text-center mt-5">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                <FileWarning className="h-7 w-7 text-primary" />
              </div>
              <CardTitle>Tem certeza que digitou corretamente? :)</CardTitle>
              <CardDescription>
                Na dúvida, entre em contato com o desenvolvedor.
              </CardDescription>
            </CardHeader>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
