import { Acronym } from '@prisma/client';
import { prisma } from '../../database/prisma';

interface IFindAcronym {
  text: string;
}

export default async ({ text }: IFindAcronym): Promise<Acronym | null> => {
  return await prisma.acronym.findUnique({
    where: {
      text,
    },
  });
};
