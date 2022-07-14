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
      <div className={classes.Layout__SocialRow}>
        {/* <div className="row"> */}
          <div className={classes.Layout__SocialRow__EmailAndPhone}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-mail"></use>
            </svg>
            <div>info@arcadia.church</div>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-phone"></use>
            </svg>
            <div>(626) 445-9764</div>
          </div>

          <div className={classes.Layout__SocialRow__Social}>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-facebook"></use>
            </svg>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-instagram"></use>
            </svg>
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-vimeo"></use>
            </svg>
          {/* </div> */}
        </div>
      </div>
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
          <Toolbar
            globalData={globalData}
            drawerToggleClicked={sideDrawerToggleHandler}
          />
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
