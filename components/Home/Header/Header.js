import Image from "next/image";

import styles from "./Header.module.scss";

const Header = ({ children, homeHeaderImage }) => (
  <div className={styles.Header}>
    <Image
      src={homeHeaderImage}
      layout="fill"
      objectFit="cover"
      className={styles.HeaderImage}
    ></Image>
    <div className={styles.HeaderText}>Welcome To Arcadia Community Church</div>
    <div className={styles.Overlay}></div>
    {console.log("HERE: ", homeHeaderImage)}
    {children}
  </div>
);

export default Header;
