import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "./db";
import { Pet, User } from "@prisma/client";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getPetByPetId(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  return pet;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function getPetByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId: userId,
    },
  });

  return pets;
}
