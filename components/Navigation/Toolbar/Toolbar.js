import Image from "next/image";
import Link from "next/link";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import classes from "./Toolbar.module.scss";

const Toolbar = ({ globalData, drawerToggleClicked }) => (
  <div className={`${classes.Toolbar}`}>
    {console.log("GLO: ", globalData)}
    <div className={classes.Logo}>
      <Image
        src={globalData.data.attributes.Navbar.logo.data.attributes.url}
        layout="fill"
      />
    </div>
    <nav className={classes.Links}>
      {globalData.data.attributes.Navbar.links.map((link) => (
        <li key={link.id}>
          <Link href={link.url}>
            <a>{link.text}</a>
          </Link>
        </li>
      ))}
    </nav>
    <DrawerToggle clicked={drawerToggleClicked} />
  </div>
);

export default Toolbar;
