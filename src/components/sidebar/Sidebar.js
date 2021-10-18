import React from "react";
import "./_sidebar.scss";
import {
  MdExitToApp,
  MdThumbUp,
  MdOutlineWatchLater,
  MdHome,
} from "react-icons/md";
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
      <li role="button" onClick={() => history.push("/")}>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      {/* <li>
        <MdOutlineExplore size={23} />
        <span>Explore</span>
      </li> */}

      <li role="button" onClick={() => history.push("/liked")}>
        <MdThumbUp size={23} />
        <span>Liked Videos</span>
      </li>

      <li role="button" onClick={() => history.push("/watchLater")}>
        <MdOutlineWatchLater size={23} />
        <span>Watch Later</span>
      </li>

      {/* <li>
        <RiPlayList2Fill size={23} />
        <span>PlayList</span>
      </li> */}

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
