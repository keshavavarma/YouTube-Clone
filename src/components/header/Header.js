import React from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../contexts/AuthContext";

const Header = ({ handleToggleSidebar }) => {
  const { currentUser } = useAuth();
  return (
    <div className="header ">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />

      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt=""
        className="header__logo"
      />

      <form>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <Avatar
          src={
            currentUser &&
            (currentUser.photoURL
              ? currentUser.photoURL
              : `https://avatars.dicebear.com/api/initials/${currentUser.displayName}.svg`)
          }
          className="avatar"
        />
      </div>
    </div>
  );
};

export default Header;
