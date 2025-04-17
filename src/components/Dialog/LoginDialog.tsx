import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  login: () => void;
}

export const LoginDialog = ({ open, onOpenChange, login }: LoginDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <VisuallyHidden asChild>
          <DialogTitle>Login with Google</DialogTitle>
        </VisuallyHidden>
        <div className="space-y-2">
          <h2 className="font-bold text-lg">Sign in with Google</h2>
          <p className="text-sm text-muted-foreground">
            Sign in to the App with Google authentication securely
          </p>
        </div>
      </DialogHeader>

      <Button onClick={() => login()} className="w-full mt-5 flex gap-3 items-center">
        <FcGoogle className="h-7 w-7" />
        Sign In
      </Button>
    </DialogContent>
  </Dialog>
);
