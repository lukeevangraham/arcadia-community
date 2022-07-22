import { useState } from "react";
import Image from "next/image";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SocialRow from "../UI/SocialRow/SocialRow";
import Header from "../Home/Header/Header";
import SearchBar from "../UI/SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Arc from "../Home/Header/arc.svg";

import classes from "./Layout.module.scss";

const Layout = ({ children, homeHeaderImage, globalData }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  const searchBarToggleHandler = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div className={classes.Layout}>
      <SocialRow />
      {homeHeaderImage ? (
        <>
          <Header homeHeaderImage={homeHeaderImage}>
            <Toolbar
              drawerToggleClicked={sideDrawerToggleHandler}
              globalData={globalData}
              searchClicked={searchBarToggleHandler}
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
          <SearchBar open={showSearchBar} home />
        </>
      ) : (
        <>
          <Toolbar
            globalData={globalData}
            searchClicked={searchBarToggleHandler}
            drawerToggleClicked={sideDrawerToggleHandler}
          />
          <SearchBar open={showSearchBar} />
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
