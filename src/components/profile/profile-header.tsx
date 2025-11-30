import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store/user-store";
import { Camera, MapPin } from "lucide-react";
import { signOut } from "next-auth/react";

export function ProfileHeader() {
  const user = useUserStore((state) => state);
  const resetUser = useUserStore((state) => state.resetUser);

  const handleLogout = () => {
    resetUser();
    signOut({ callbackUrl: "/auth" });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {user.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full shadow-lg"
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold text-foreground">
            {user.fullName}
          </h1>
          <p className="text-muted-foreground mt-1">{user.email}</p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        </div>

        <Button
          variant={"outline"}
          className="mt-5 font-semibold cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Card>
  );
}
