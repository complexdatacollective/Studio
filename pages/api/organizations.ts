import { PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient();

type Data = {
  data: Prisma.OrganizationSelect[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body;
  try {
    const result = await prisma.organization.findMany();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
};
