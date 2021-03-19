import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { decode } from 'html-entities';

const prisma = new PrismaClient();

async function main() {
  const data: { [key: string]: string } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'data.json'), 'utf-8')
  );

  const inserts = [];

  for (const value in data) {
    const [[text, definition]] = Object.entries(data[value]);
    inserts.push({
      text: decode(text),
      definition: decode(definition),
    });
  }

  const promisesInsert = inserts.map(
    async i =>
      await prisma.acronym.create({
        data: i,
      })
  );

  console.log(promisesInsert.length);

  await Promise.all(promisesInsert);
}
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
