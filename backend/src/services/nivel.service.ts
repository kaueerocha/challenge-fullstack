import { prisma } from '../prisma/client';

export const getAllNivel = async () => {
   const niveis = await prisma.nivel.findMany({
      include: {
         _count: {
            select: { devs: true },
         }
      },
   });

   return niveis.map((n) => ({
      id: n.id,
      nivel: n.nivel,
      countDevs: n._count.devs,
   }))
};

export const createNivel = async (nivel: string) => {
   return prisma.nivel.create({
      data: {
         nivel,
      },
   });
};

export const updateNivel = async (id: number, nivel: string) => {
   const exist = await prisma.nivel.findUnique({ where: { id } });
   if (!exist) return null;

   return prisma.nivel.update({
      where: { id },
      data: {
         nivel
      },
   });
};

export const deleteNivel = async (id: number): Promise<'OK' | 'HAS_ASSOCIATED' | 'NOT_FOUND'> => {
   const nivel = await prisma.nivel.findUnique({ where: { id }});
   if (!nivel) return 'NOT_FOUND';

   const associatedDevs = await prisma.desenvolvedor.findMany({
      where: { nivel_id: id },
   });

   if (associatedDevs.length > 0 ) return 'HAS_ASSOCIATED';

   await prisma.nivel.delete({ where: { id } });
   return 'OK';
}
