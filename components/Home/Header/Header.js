import Image from "next/image";
import Arc from "./arc.svg";
import Toolbar from "../../Navigation/Toolbar/Toolbar";

import classes from "./Header.module.scss";

const Header = ({ children, homeHeaderImage }) => (
  <div className={classes.Header}>
    {children}
    <Image
      src={homeHeaderImage}
      layout="fill"
      objectFit="cover"
      priority
      className={classes.HeaderImage}
    ></Image>
    <div className={classes.HeaderText}>
      Welcome To Arcadia Community Church
    </div>
    <div className={classes.Overlay}></div>
    <div className={classes.Arc}>
      <Image
        src={Arc}
        layout="fill"
        objectFit="fill"
        className={classes.ArcImage}
      ></Image>
    </div>
  </div>
);

export default Header;
