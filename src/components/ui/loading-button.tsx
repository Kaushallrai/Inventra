import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function LoadingButton({ pending }: { pending: boolean }) {
  return (
    <Button className="w-full " type="submit" disabled={pending}>
      {pending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin " />
          Please wait
        </div>
      ) : (
        "Login"
      )}
    </Button>
  );
}
