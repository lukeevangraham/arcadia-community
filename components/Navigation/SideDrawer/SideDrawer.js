import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({ open, closed }) => (
  <>
    <Backdrop show={open} clicked={closed} />
    <div
      className={
        open
          ? `${classes.SideDrawer} ${classes.SideDrawer__open}`
          : `${classes.SideDrawer} ${classes.SideDrawer__closed}`
      }
    >
      SideDrawer
    </div>
  </>
);

export default SideDrawer;
