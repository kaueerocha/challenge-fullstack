const API_BASE_URL = import.meta.env.VITE_API_URL;

export type Nivel = {
  id: number;
  nivel: string;
  countDevs?: number;
};

const API_URL = API_BASE_URL + "/nivel";

export async function getNivel(nivel?: string): Promise<Nivel[]> {
  const query = nivel ? `?nivel=${encodeURIComponent(nivel)}` : "";
  const res = await fetch(`${API_URL}${query}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar dados do backend");
  }

  return res.json();
}

export async function deleteNivel(id: Number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (res.status === 204) {
    // Sucesso sem conteúdo, apenas retorna
    return;
  }

  if (!res.ok) {
    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      throw new Error(text || "Erro desconhecido");
    }
    throw new Error(data.error || "Erro desconhecido");
  }
}

export async function createNivel(nivel: string): Promise<Nivel> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nivel }),
  });
  if (!res.ok) throw new Error("Erro ao criar nível");
  return res.json();
}

export async function updateNivel(id: Number, nivel: string) {
  const res = await fetch(`${API_BASE_URL}/nivel/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nivel }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar nível");
  }

  return res.json();
}
