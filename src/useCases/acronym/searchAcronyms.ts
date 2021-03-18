import { Acronym } from '@prisma/client';
import { prisma } from '../../database/prisma';

interface ISearchAcronym {
  search: string;
  limit: number;
  from: number;
}

export default async ({
  search,
  limit,
  from,
}: ISearchAcronym): Promise<Acronym[]> => {
  return await prisma.acronym.findMany({
    skip: from,
    take: limit,
    where: {
      text: {
        contains: search,
      },
    },
  });
};
