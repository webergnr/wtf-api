import { prisma } from '../../database/prisma';

interface IRemoveAcronym {
  id: number;
}

export default async ({ id }: IRemoveAcronym): Promise<void> => {
  await prisma.acronym.delete({
    where: {
      id,
    },
  });
};
