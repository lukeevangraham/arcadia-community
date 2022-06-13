import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import Image from "next/image";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({ open, closed, globalData }) => (
  <>
    {console.log("GLOBAL DATA: ", globalData)}
    <Backdrop show={open} clicked={closed} />
    <div
      className={
        open
          ? `${classes.SideDrawer} ${classes.SideDrawer__open}`
          : `${classes.SideDrawer} ${classes.SideDrawer__closed}`
      }
    >
      <div className={classes.SideDrawer__logo}>
        <Image
          src={globalData.data.attributes.Navbar.logo.data.attributes.url}
          alt={
            globalData.data.attributes.Navbar.logo.data.attributes
              .alternativeText
          }
          layout="fill"
        />
      </div>
      <div className={classes.SideDrawer__name}>
        arcadia
        <br />
        community
        <br />
        church
      </div>
      <NavigationItems links={globalData.data.attributes.Navbar.links} />
      {/* {globalData.data.attributes.Navbar.links.map((navLink) => (
        <div>{navLink.text}</div>
      ))} */}
    </div>
  </>
);

export default SideDrawer;
