import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "../../_app.scss";
import { useAuth } from "../../contexts/AuthContext";
const Layout = ({ children }) => {
  const { logout } = useAuth();
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);

  return (
    <div>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container ">
        <Sidebar
          sidebar={sidebar}
          handleToggleSidebar={handleToggleSidebar}
          logout={logout}
        />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default Layout;
