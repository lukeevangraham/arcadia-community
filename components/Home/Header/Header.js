import Image from "next/image";
import Arc from "./arc.svg";
import Toolbar from "../../Navigation/Toolbar/Toolbar";

import classes from "./Header.module.scss";

const Header = ({ children, homeHeaderImage }) => (
  <div className={classes.Header}>
    {children}
    <video autoPlay loop muted className={classes.Header__BGVid}>
      <source src={homeHeaderImage.url} />
    </video>
    {/* <Image
      src={homeHeaderImage.url}
      alt={homeHeaderImage.alternativeText}
      layout="fill"
      objectFit="cover"
      priority
      className={classes.HeaderImage}
    ></Image> */}
    <div className={classes.HeaderText}>
      Join us Sundays at 10:30am <br />
      Live and Online
    </div>
    <div className={classes.Overlay}></div>
    <div className={classes.Arc}>
      <Image
        src={Arc}
        alt="Design element"
        layout="fill"
        objectFit="fill"
        className={classes.ArcImage}
      ></Image>
    </div>
  </div>
);

export default Header;
