import { Acronym } from '@prisma/client';
import { prisma } from '../../database/prisma';

interface IRandomAcronym {
  count: number;
}

const generateRandomArray = async (totalNumbers: number) => {
  const countEveryAcronym = await prisma.acronym.count();
  const list: number[] = [];

  while (list.length < Math.min(totalNumbers, countEveryAcronym)) {
    const randomNumber = Math.ceil(Math.random() * countEveryAcronym);
    console.log('number generated: ', randomNumber);
    if (list.indexOf(randomNumber) === -1) {
      list.push(randomNumber);
    }
  }

  return list;
};

export default async ({ count }: IRandomAcronym): Promise<Acronym[]> => {
  const randomNumbers = await generateRandomArray(count);

  return await prisma.acronym.findMany({
    where: {
      id: {
        in: randomNumbers,
      },
    },
    take: count,
  });
};
