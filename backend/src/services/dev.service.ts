import { prisma } from '../prisma/client';

export const getAllDev = async (nome?: string) => {
   return prisma.desenvolvedor.findMany({
      where: nome
         ? {
              nome: {
                 contains: nome,
                 mode: 'insensitive',
              },
           }
         : undefined,
      include: {
         nivel: true,
      },
   });
};

type CreateDevInput = {
   nivel_id: number;
   nome: string;
   sexo: string;
   data_nascimento: string;
   hobby: string;
};

export const createDev = async ({
   nivel_id,
   nome,
   sexo,
   data_nascimento,
   hobby,
}: CreateDevInput) => {
   const newDev = await prisma.desenvolvedor.create({
      data: {
         nivel_id,
         nome,
         sexo,
         hobby,
         data_nascimento: new Date(data_nascimento),
      },
   });
   return newDev;
};

type UpdateDevParams = {
   id: number;
   nivel_id: number;
   nome: string;
   sexo: string;
   data_nascimento: string;
   hobby: string;
};

export const updateDev = async ({
   id,
   nivel_id,
   nome,
   sexo,
   data_nascimento,
   hobby,
}: UpdateDevParams) => {
   const exist = await prisma.desenvolvedor.findUnique({ where: { id } });
   if (!exist) return null;

   return prisma.desenvolvedor.update({
      where: { id },
      data: {
         nivel_id,
         nome,
         sexo,
         hobby,
         data_nascimento: new Date(data_nascimento),
      },
   });
};

export const deleteDev = async (id: number) => {
   const dev = await prisma.desenvolvedor.findUnique({ where: { id } });

   if (!dev) {
      throw new Error('Desenvolvedor não encontrado');
   }

   await prisma.desenvolvedor.delete({ where: { id } });
};
