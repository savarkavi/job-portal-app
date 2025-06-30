import {
  BriefcaseBusinessIcon,
  HomeIcon,
  MessageCircleMoreIcon,
  UsersRoundIcon,
} from "lucide-react";

export const recruiterSidebarItems = [
  {
    id: 1,
    label: "Home",
    icon: HomeIcon,
    url: "/home",
  },
  {
    id: 2,
    label: "Post a Job",
    icon: BriefcaseBusinessIcon,
    url: "/post-job",
  },
  {
    id: 3,
    label: "Candidates",
    icon: UsersRoundIcon,
    url: "/candidates",
  },
  {
    id: 4,
    label: "Messages",
    icon: MessageCircleMoreIcon,
    url: "/messages",
  },
];
