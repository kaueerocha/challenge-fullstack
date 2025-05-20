import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { createDev } from "@/services/devService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getNivel, type Nivel } from "@/services/nivelService";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const createDevSchema = z.object({
  nivel_id: z.number().min(1, "O nível é obrigatório"),
  nome: z.string().min(1, "O nome é obrigatório"),
  sexo: z.enum(["M", "F"], {
    message: "Selecione um sexo válido",
  }),
  data_nascimento: z.string().refine(
    (val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    },
    {
      message: "Data de nascimento inválida",
    }
  ),
  hobby: z.string().min(2, "Preencha o hobby favorito"),
});

export type CreateDevFormData = z.infer<typeof createDevSchema>;

export default function CreateDev() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optionNivel, setOptionNivel] = useState<Nivel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<CreateDevFormData>({
    resolver: zodResolver(createDevSchema),
    defaultValues: {
      nome: "",
      data_nascimento: "",
      hobby: "",
    },
  });

  const onSubmit = async (data: CreateDevFormData) => {
    setIsSubmitting(true);
    toast.loading("Cadastrando desenvolvedor...", { id: "loading" });

    try {
      await createDev(data);
      toast.success("Desenvolvedor cadastrado com sucesso!", { id: "loading" });
      navigate(-1);
    } catch (error: any) {
      console.error("Erro ao cadastrar desenvolvedor:", error);
      toast.error("Erro ao cadastrar desenvolvedor", { id: "loading" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function fetchNiveis() {
      setIsLoading(true);
      try {
        const niveis = await getNivel();
        setIsLoading(false);
        setOptionNivel(niveis);
      } catch (error) {
        console.error("Erro ao buscar níveis:", error);
      }
    }

    fetchNiveis();
  }, []);

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
        <div className="flex items-center justify-between my-6">
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h3 className="text-2xl font-bold">Cadastrar Desenvolvedor</h3>
          </div>
        </div>

        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader className="mb-4">
                <CardTitle>Novo Desenvolvedor</CardTitle>
                <CardDescription>
                  Preencha os campos para o novo Dev!
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 mb-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome Completo" {...field} />
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
                        {optionNivel.length === 0 ? (
                          <Button
                            variant="secondary"
                            onClick={() => navigate("/nivel/create")}
                            type="button"
                          >
                            Nenhum nível disponível. Clique aqui para criar um.
                          </Button>
                        ) : (
                          <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={String(field.value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                            <SelectContent>
                              {optionNivel.map((n) => (
                                <SelectItem key={n.id} value={n.id.toString()}>
                                  {n.nivel}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
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
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Salvando..." : "Salvar Desenvolvedor"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </motion.div>
  );
}
