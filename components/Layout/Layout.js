import { useState } from "react";
import Image from "next/image";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Header from "../Home/Header/Header";
import Footer from "../Footer/Footer";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Arc from "../Home/Header/arc.svg";

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
            home
          />
          {/* <div className={classes.Arc}>
            <Image
              src={Arc}
              layout="fill"
              objectFit="fill"
              className={classes.ArcImage}
            ></Image>
          </div> */}
        </Header>
      ) : (
        <>
          <Toolbar globalData={globalData} />
          {/* <div className={classes.Arc}>
            <Image
              src={Arc}
              layout="fill"
              objectFit="fill"
              className={classes.ArcImage}
            ></Image>
          </div> */}
        </>
      )}
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        globalData={globalData}
      />
      <main className={classes.Layout__mainWrapper}>{children}</main>
      <Footer globalData={globalData} />
    </div>
  );
};

export default Layout;
