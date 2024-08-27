"use client";

import { usePetContext } from "@/lib/hooks";

import Image from "next/image";
import PetButton from "./pet-button";
import { Pet } from "@prisma/client";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="h-full w-full flex flex-col">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />
          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="flex items-center justify-center h-full w-full text-3xl text-zinc-800">
      Select a pet to view details
    </p>
  );
}

function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <Image
        src={pet.imageUrl}
        alt="selected pet"
        width={75}
        height={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="checkout"
          
          onClick={async () => await handleCheckoutPet(pet.id)}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

type Props = {
  pet: Pet;
};

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="bg-white px-7 py-5 rounded-md mb-9 mx-8 flex-1 border border-light">
      {pet.notes}
    </section>
  );
}
