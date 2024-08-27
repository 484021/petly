"use client"
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";



export default function PetList() {
  const { pets, handleChangeSelectedPetId, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();
  const filteredPets = pets.filter((pet) =>
    //filter pets based on search query pay attention to first letter of the search query
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())

  );
  
  


  return (
    <ul className="bg-white border-b border-light
    ">
      
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button onClick={() => {
            handleChangeSelectedPetId(pet.id);
          }}className={cn("flex h-[70px] w-full cursor-pointer items-center px-5 text-base gap-3 hover:bg-[#Eff1F2] focus:bg-[#Eff1F2] transition", {
            "bg-[#Eff1F2]": selectedPetId === pet.id
          })}>
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="rounded-full object-cover w-[45px] h-[45px]"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
