import { Acronym } from '@prisma/client';
import { prisma } from '../../database/prisma';

interface IFindAcronym {
  id: number;
}

export default async ({ id }: IFindAcronym): Promise<Acronym | null> => {
  return await prisma.acronym.findUnique({
    where: {
      id,
    },
  });
};
