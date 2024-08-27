
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {

  return (
    <Button type="submit" className="mt-5 self-end" >
      {actionType === "add" ? "Add Pet" : "Save Changes"}
    </Button>
  );
}
