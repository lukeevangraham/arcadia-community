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
      className={classes.HeaderImage}
    ></Image>
    <div className={classes.HeaderText}>
      Welcome To Arcadia Community Church
    </div>
    <div className={classes.Overlay}></div>
    {console.log("HERE: ", homeHeaderImage)}
    <div className={classes.Arc}>
      <Image src={Arc} layout="fill" objectFit="fill"></Image>
    </div>
  </div>
);

export default Header;
