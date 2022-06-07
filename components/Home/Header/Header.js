import Image from "next/image";
import Toolbar from "../../Navigation/Toolbar/Toolbar";

import styles from "./Header.module.scss";

const Header = ({ children, homeHeaderImage }) => (
  <div className={styles.Header}>
    {children}
    <Image
      src={homeHeaderImage}
      layout="fill"
      objectFit="cover"
      className={styles.HeaderImage}
    ></Image>
    <div className={styles.HeaderText}>Welcome To Arcadia Community Church</div>
    <div className={styles.Overlay}></div>
    {console.log("HERE: ", homeHeaderImage)}
  </div>
);

export default Header;
