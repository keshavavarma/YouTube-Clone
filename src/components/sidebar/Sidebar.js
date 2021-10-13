import React from "react";
import "./_sidebar.scss";
import {
  MdExitToApp,
  MdThumbUp,
  MdOutlineWatchLater,
  MdHome,
  MdOutlineExplore,
} from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { useHistory } from "react-router";

const Sidebar = ({ sidebar, handleToggleSidebar, logout }) => {
  const history = useHistory();

  const logoutHandler = async () => {
    try {
      await logout();
      history.push("/Login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <li>
        <MdOutlineExplore size={23} />
        <span>Explore</span>
      </li>

      <li>
        <MdThumbUp size={23} />
        <span>Liked Videos</span>
      </li>

      <li>
        <MdOutlineWatchLater size={23} />
        <span>Watch Later</span>
      </li>

      <li>
        <RiPlayList2Fill size={23} />
        <span>PlayList</span>
      </li>

      <hr />

      <li role="button" onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

      <hr />
    </nav>
  );
};

export default Sidebar;
