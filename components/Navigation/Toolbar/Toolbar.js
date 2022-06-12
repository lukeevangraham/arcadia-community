import Image from "next/image";
import Link from "next/link";
import styles from "./Toolbar.module.scss";

const Toolbar = ({ globalData }) => (
  <div className={`${styles.Toolbar}`}>
    {console.log("GLO: ", globalData)}
    <div className={styles.Logo}>
      <Image
        src={globalData.data.attributes.Navbar.logo.data.attributes.url}
        layout="fill"
      />
    </div>
    <ul className={styles.Links}>
      {globalData.data.attributes.Navbar.links.map((link) => (
        <li key={link.id}>
          <Link href={link.url}>
            <a>{link.text}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Toolbar;
