import type { CreateDevFormData } from "@/pages/dev/CreateDev";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const SEXO_OPTIONS = {
  M: "Masculino",
  F: "Feminino",
} as const;

export type Sexo = keyof typeof SEXO_OPTIONS;

export type Desenvolvedor = {
  id: number;
  nome: string;
  sexo: Sexo;
  data_nascimento: Date;
  hobby: string;
  nivel_id: number;
  nivel: {
    id: number;
    nivel: string;
  };
};

const API_URL = API_BASE_URL + "/desenvolvedor";

export async function getDev(nome?: string): Promise<Desenvolvedor[]> {
  const query = nome ? `?nome=${encodeURIComponent(nome)}` : "";
  const res = await fetch(`${API_URL}${query}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar dados do backend");
  }

  return res.json();
}

export async function deleteDev(id: Number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Erro desconhecido");
  }
}

export async function createDev(
  dev: CreateDevFormData
): Promise<Desenvolvedor> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dev),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar desenvolvedor");
  return res.json();
}

export type UpdateDevData = {
  nome: string;
  sexo: "M" | "F";
  data_nascimento: string;
  nivel_id: number;
};

export async function updateDev(id: number, data: UpdateDevData) {
  const res = await fetch(`${API_BASE_URL}/desenvolvedor/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar desenvolvedor");
  }

  return res.json();
}
