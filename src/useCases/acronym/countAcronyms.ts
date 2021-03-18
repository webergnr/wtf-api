import { prisma } from '../../database/prisma';

interface ICountAcronym {
  search: string;
}

export default async ({ search }: ICountAcronym): Promise<number> => {
  return await prisma.acronym.count({
    where: {
      text: {
        contains: search,
      },
    },
  });
};
