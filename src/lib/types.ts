import { Pet } from "@prisma/client";

export type PetClient = Omit<Pet, "id" | "createdAt" | "updatedAt" | "userId">;
