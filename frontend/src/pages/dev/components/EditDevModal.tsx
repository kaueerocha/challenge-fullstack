import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateDev } from "@/services/devService";
import { getNivel } from "@/services/nivelService";
import { Description } from "@radix-ui/react-dialog";

const schema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  sexo: z.enum(["M", "F"], { required_error: "Sexo é obrigatório" }),
  data_nascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  nivel_id: z.number({ invalid_type_error: "Selecione um nível válido" }),
  hobby: z.string().min(2, "Preencha o hobby favorito"),
});

type EditDevFormData = z.infer<typeof schema>;

type Props = {
  initialDev: {
    id: number;
    nome: string;
    sexo: "M" | "F";
    data_nascimento: string;
    nivel_id: number;
    hobby: string;
  };
  onClose: () => void;
  fetchDevs: () => void;
};

export function EditDevModal({ initialDev, onClose, fetchDevs }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [niveis, setNiveis] = useState<{ id: number; nivel: string }[]>([]);
  const [loadingNiveis, setLoadingNiveis] = useState(true);

  useEffect(() => {
    const fetchNiveis = async () => {
      try {
        const data = await getNivel();
        setNiveis(data);
      } catch (err) {
        toast.error("Erro ao carregar níveis");
      } finally {
        setLoadingNiveis(false);
      }
    };

    fetchNiveis();
  }, []);

  const form = useForm<EditDevFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: initialDev.nome,
      sexo: initialDev.sexo,
      data_nascimento: initialDev.data_nascimento,
      nivel_id: initialDev.nivel_id,
      hobby: initialDev.hobby,
    },
  });

  const onSubmit = async (data: EditDevFormData) => {
    setIsSubmitting(true);
    toast.loading("Atualizando desenvolvedor...", { id: "edit-dev-loading" });

    try {
      await updateDev(initialDev.id, data);
      toast.success("Desenvolvedor atualizado com sucesso!", {
        id: "edit-dev-loading",
      });
      fetchDevs();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar desenvolvedor", {
        id: "edit-dev-loading",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <Description/>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Editar Desenvolvedor</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sexo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sexo</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="M" id="m" />
                          <Label htmlFor="m">Masculino</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="F" id="f" />
                          <Label htmlFor="f">Feminino</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data_nascimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nivel_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nível do Desenvolvedor</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(val) => field.onChange(Number(val))}
                        value={String(field.value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          {niveis.length > 0 ? (
                            niveis.map((n) => (
                              <SelectItem key={n.id} value={n.id.toString()}>
                                {n.nivel}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-4 text-sm">
                              Nenhum nível cadastrado.{" "}
                              <a
                                href="/nivel/create"
                                className="text-blue-500 underline"
                              >
                                Criar nível
                              </a>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hobby"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hobby</FormLabel>
                    <FormControl>
                      <Input placeholder="Hobby favorito" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="outline" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
