import { useState } from "react"
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Header from "../Home/Header/Header";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.scss";

const Layout = ({ children, homeHeaderImage, globalData }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer)
  }
  
  return (
  <>
    {homeHeaderImage ? (
      <Header homeHeaderImage={homeHeaderImage}>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler} globalData={globalData} />
      </Header>
    ) : (
      <Toolbar globalData={globalData} />
    )}
    <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} globalData={globalData} />
    {children}
  </>
)};

export default Layout;
