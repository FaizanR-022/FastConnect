// constants/headerConstants.js
import { Home, Users, MessageSquare, FileText } from "lucide-react";
import { ROUTES } from "./constants";

export const NAV_ITEMS = [
  {
    label: "Home",
    icon: Home,
    path: ROUTES.HOME,
  },
  {
    label: "Alumni Directory",
    icon: Users,
    path: ROUTES.ALUMNI_LIST,
  },
  {
    label: "Q&A Posts",
    icon: MessageSquare,
    path: ROUTES.POSTS,
  },
  {
    label: "My Posts",
    icon: FileText,
    path: ROUTES.MY_POSTS,
  },
];
