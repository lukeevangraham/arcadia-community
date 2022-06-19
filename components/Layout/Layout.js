import { useState } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Header from "../Home/Header/Header";
import Footer from "../Footer/Footer";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.scss";

const Layout = ({ children, homeHeaderImage, globalData }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <div className={classes.Layout}>
      {homeHeaderImage ? (
        <Header homeHeaderImage={homeHeaderImage}>
          <Toolbar
            drawerToggleClicked={sideDrawerToggleHandler}
            globalData={globalData}
          />
        </Header>
      ) : (
        <Toolbar globalData={globalData} />
      )}
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        globalData={globalData}
      />
      {children}
      <Footer globalData={globalData} />
    </div>
  );
};

export default Layout;
