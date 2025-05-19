const API_BASE_URL = import.meta.env.VITE_API_URL

export type Nivel = {
  id: number
  nivel: string
  countDevs?: number
}

const API_URL = API_BASE_URL + '/nivel'

export async function getNivel(): Promise<Nivel[]> {
  const res = await fetch(`${API_URL}`)

  if (!res.ok) {
    throw new Error('Erro ao buscar dados do backend')
  }

  return res.json()
}

export async function deleteNivel(id: Number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Erro ao deletar nível')
}
