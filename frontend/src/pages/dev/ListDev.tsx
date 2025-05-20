import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Loader, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDeleteDevModal from "./components/ConfirmDeleteDevModal";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { EditDevModal } from "./components/EditDevModal";
import { getDev, type Desenvolvedor } from "@/services/devService";
import { Input } from "@/components/ui/input";
import { SearchBar } from "@/components/SearchBar";

export default function ListDev() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [devs, setDevs] = useState<Desenvolvedor[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<Number | null>(null);
  const [editDev, setEditDev] = useState<Desenvolvedor | null>(null);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchDevs();
  }, []);

  const fetchDevs = async (nome?: string) => {
    try {
      const data = await getDev(nome);
      setDevs(data);
    } catch {
      toast.error("Erro ao carregar desenvolvedores");
    } finally {
      setIsLoading(false);
      setIsLoadingTable(false);
    }
  };

  const handleSearch = () => {
    setIsLoadingTable(true);
    fetchDevs(searchName);
  };

  // Delete Dev
  const handleDeleteClick = (id: Number) => {
    setConfirmDeleteId(id);
  };

  // Edit Dev
  const handleEditClick = (dev: Desenvolvedor) => {
    setEditDev(dev);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Loader className="animate-spin w-12 h-12" />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto py-6 px-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h3 className="text-2xl font-bold">Desenvolvedores</h3>
          </div>

          <Button variant="secondary" onClick={() => navigate("/dev/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Desenvolvedor
          </Button>
        </div>

        <div className="flex justify-center sm:justify-end mb-6">
          <SearchBar
            value={searchName}
            onChange={setSearchName}
            onSearch={handleSearch}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Lista de desenvolvedores</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-50">Nome</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Sexo</TableHead>
                <TableHead>Data Nascimento</TableHead>
                <TableHead>Hobby</TableHead>
                <TableHead className="w-20 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingTable && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex justify-center py-4">
                      <Loader className="animate-spin w-6 h-6 text-muted-foreground" />
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Nenhum dev encontrado */}
              {!isLoadingTable && devs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="text-center text-muted-foreground py-4">
                      Nenhum desenvolvedor encontrado.
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Lista de devs */}
              {!isLoadingTable &&
                devs.map((dev, id) => (
                  <TableRow key={id}>
                    <TableCell>{dev.nome}</TableCell>
                    <TableCell>{dev.nivel.nivel}</TableCell>
                    <TableCell>{dev.sexo}</TableCell>
                    <TableCell>
                      {new Date(dev.data_nascimento).toLocaleDateString(
                        "pt-BR"
                      )}
                    </TableCell>
                    <TableCell>{dev.hobby}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(dev)}
                          className="bg-white-500 hover:bg-blue-400 text-foreground rounded-full p-2 flex items-center justify-center transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(dev.id)}
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
        </div>

        {confirmDeleteId && (
          <ConfirmDeleteDevModal
            devId={confirmDeleteId}
            onClose={() => setConfirmDeleteId(null)}
            fetchDevs={fetchDevs}
          />
        )}

        {editDev && (
          <EditDevModal
            initialDev={{
              id: editDev.id,
              nome: editDev.nome,
              sexo: editDev.sexo,
              nivel_id: editDev.nivel_id,
              data_nascimento: new Date(editDev.data_nascimento)
                .toISOString()
                .split("T")[0],
              hobby: editDev.hobby,
            }}
            onClose={() => setEditDev(null)}
            fetchDevs={fetchDevs}
          />
        )}
      </div>
    </motion.div>
  );
}
