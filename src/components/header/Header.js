import React, { useRef } from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { RiReactjsFill } from "react-icons/ri";

const Header = ({ handleToggleSidebar }) => {
  const { currentUser } = useAuth();
  const inputRef = useRef();
  const history = useHistory();

  const searchHandler = (e) => {
    e.preventDefault();
    history.push(`/search/${inputRef.current.value}`);
  };

  return (
    <div className="header ">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <div className="header__logo">
        <RiReactjsFill size={40} />
        {/* <img src={<RiReactjsFill />} alt="" className="header__logo" /> */}
        <h4>ReactTube</h4>
      </div>

      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search"
          ref={inputRef}
          onChange={(e) => (inputRef.current.value = e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        {/* <MdNotifications size={28} />
        <MdApps size={28} /> */}
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
