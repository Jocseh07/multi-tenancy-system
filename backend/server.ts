import dotenv from "dotenv";
import app from "./index";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
console.log("Prisma client created");

dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
