import Image from "next/image";
import Link from "next/link";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import Brandname from "../../UI/Brandname/Brandname";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({ open, closed, globalData }) => (
  <>
    <Backdrop show={open} clicked={closed} />
    <div
      className={
        open
          ? `${classes.SideDrawer} ${classes.SideDrawer__open}`
          : `${classes.SideDrawer} ${classes.SideDrawer__closed}`
      }
    >
      <Link href="/">
        <a style={{ display: "contents" }}>
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
            <Brandname />
          </div>
        </a>
      </Link>
      <NavigationItems links={globalData.data.attributes.Navbar.links} button={globalData.data.attributes.Navbar.button} fromSideDrawer />
      {/* {globalData.data.attributes.Navbar.links.map((navLink) => (
        <div>{navLink.text}</div>
      ))} */}
    </div>
  </>
);

export default SideDrawer;
