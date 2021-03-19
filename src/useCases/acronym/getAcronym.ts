import { Acronym } from '@prisma/client';
import { prisma } from '../../database/prisma';

interface IFindAcronym {
  text: string;
}

export default async ({ text }: IFindAcronym): Promise<Acronym[]> => {
  return await prisma.acronym.findMany({
    where: {
      text,
    },
  });
};
