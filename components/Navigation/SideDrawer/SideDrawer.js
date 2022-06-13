import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";

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
      <NavigationItems links={globalData.data.attributes.Navbar.links} />
      {/* {globalData.data.attributes.Navbar.links.map((navLink) => (
        <div>{navLink.text}</div>
      ))} */}
    </div>
  </>
);

export default SideDrawer;
