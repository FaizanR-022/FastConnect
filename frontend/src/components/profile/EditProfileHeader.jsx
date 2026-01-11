import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

/**
 * Header for profile editing page with avatar, title, and description
 */
export default function EditProfileHeader({ 
  profilePicture, 
  firstName, 
  lastName, 
  title = "Edit Profile",
  description = "Update your professional information"
}) {
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`;

  return (
    <div className="flex flex-col items-center text-center mb-6">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={profilePicture} />
        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
}
