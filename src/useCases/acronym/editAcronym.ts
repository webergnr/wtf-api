import { prisma } from '../../database/prisma';

interface IEditAcronym {
  id: number;
  text: string;
  definition: string;
}

export default async ({
  id,
  text,
  definition,
}: IEditAcronym): Promise<void> => {
  await prisma.acronym.update({
    where: {
      id,
    },
    data: {
      definition,
      text,
    },
  });
};
