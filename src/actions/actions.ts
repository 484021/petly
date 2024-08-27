"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { checkAuth, getPetByPetId } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//user actions
export async function logIn(prevState: unknown, formData: unknown) {
  //check if form data is a form data type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  //
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials",
          };
        }
        default: {
          return {
            message: "Error. Failed to log in",
          };
        }
      }
    }
    throw error; // nextjs signup redirect throws error, we need to rethrow it
  }
}

export async function logOut() {
  await signOut({
    redirectTo: "/",
  });
}

export async function signUp(prevState: unknown, formData: unknown) {
  //check if form data is a form data type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  //covert form data to object
  const formDataEntries = Object.fromEntries(formData.entries());
  //validate form data
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
        hasAccess: false,
        
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "User already exists",
        };
      }
    }
    console.error(error);
    return {
      message: "Failed to create user",
    };
  }
  await signIn("credentials", formData);
}
//pet actions
export async function addPet(pet: unknown) {

  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }
  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Failed to add pet",
    };
  }

  revalidatePath("/app, layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {

  //authentication check
  const session = await checkAuth();

  //validation

  const validatedPet = petFormSchema.safeParse(newPetData);
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPet.success || !validatedPetId.success) {
    return {
      message: "Invalid pet data",
    };
  }
  //authorization check (user can only edit their own pets)
  const pet = await getPetByPetId(validatedPetId.data);
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Unauthorized",
    };
  }

  //database mutation
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Failed to edit pet",
    };
  }

  revalidatePath("/app, layout");
}

export async function deletePet(petId: unknown) {

  //authentication check
  const session = await checkAuth();
  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      message: "Invalid pet ID",
    };
  }

  //authorization check (user can only delete their own pets)
  const pet = await getPetByPetId(validatedPetId.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Unauthorized",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Failed to delete pet",
    };
  }

  revalidatePath("/app, layout");
}

//payment actions
export async function createCheckoutSession() {
  const session = await checkAuth();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment/?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment/?cancelled=true`,
  });

  //redirect
  redirect(checkoutSession.url);
}

export async function updateUserAccess() {
  const session = await checkAuth();

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      hasAccess: true,
    },
  });

  redirect("/app/dashboard");
}
