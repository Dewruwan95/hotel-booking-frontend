import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Bookmark, LogOut, Settings, User } from "lucide-react";
import { TbMessageReport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

function ProfileDropDown({ onLogoutClick }) {
  const navigate = useNavigate();
  return (
    <>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigate("/bookings")}
            className="bg-purple-100 hover:bg-purple-500"
          >
            <Bookmark />
            <span>Bookings</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate("/profile")}
            className="bg-purple-100"
          >
            <User />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate("/review")}
            className="bg-purple-100"
          >
            <FaRegStar />
            <span>Feedbacks</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate("/inquiry")}
            className="bg-purple-100"
          >
            <TbMessageReport />

            <span>Inquiries</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="bg-purple-100">
            <Settings />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onLogoutClick} className="bg-purple-100">
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </>
  );
}

export default ProfileDropDown;
