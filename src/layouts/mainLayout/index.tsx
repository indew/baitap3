import HeaderComponent from "../../component/headerComponent";
import SideBar from "../../component/SideBar";
import React from "react";
import "./styles.scss";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout-container">
      <HeaderComponent />
      <div className="main-layout-container_content">
        <SideBar />
        <div className="right-side"></div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;