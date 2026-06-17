import { UserAvatarProps } from "@/lib/type";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcnui/avatar";

const UserAvatar = ({ name, image }: UserAvatarProps) => {
  const initials =
    name?.trim() ?
      name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CN";

  return (
    <Avatar size="sm">
      <AvatarImage
        src={`${image}`}
        height={24}
        width={24}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
