import Image from "next/image";
import Link from "next/link";
import NavigationItems from "../NavigationItems/NavigationItems";
import Button from "../../UI/Button/Button";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Brandname from "../../UI/Brandname/Brandname";

import classes from "./Toolbar.module.scss";

const Toolbar = ({ globalData, drawerToggleClicked, searchClicked, home }) => (
  <div
    className={
      home
        ? `${classes.Toolbar} ${classes.Toolbar_homeBg}`
        : `${classes.Toolbar}`
    }
  >
    <Link href={"/"}>
      <a>
        <div className={classes.Logo}>
          <Image
            src={globalData.data.attributes.Navbar.logo.data.attributes.url}
            alt={
              globalData.data.attributes.Navbar.logo.data.attributes
                .alternativeText
            }
            layout="fill"
          />
        </div>
      </a>
    </Link>
    {/* <div className={classes.Name}>Arcadia <br /> Community <br /> Church</div> */}
    <Link href={"/"}>
      <a>
        <Brandname />
      </a>
    </Link>
    <div className={classes.DesktopOnly}>
      <NavigationItems
        links={globalData.data.attributes.Navbar.links}
        button={globalData.data.attributes.Navbar.button}
        searchClicked={searchClicked}
      />
    </div>
    {/* <nav className={classes.Links}>
      {globalData.data.attributes.Navbar.links.map((link) => (
        <li key={link.id}>
          <Link href={link.url}>
            <a>{link.text}</a>
          </Link>
        </li>
      ))}
    </nav> */}
    <DrawerToggle clicked={drawerToggleClicked} />
  </div>
);

export default Toolbar;
