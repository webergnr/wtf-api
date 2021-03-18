import { prisma } from '../../database/prisma';

interface ICreateAcronym {
  text: string;
  definition: string;
}

export default async ({ definition, text }: ICreateAcronym): Promise<void> => {
  await prisma.acronym.create({
    data: {
      definition,
      text,
    },
  });
};
