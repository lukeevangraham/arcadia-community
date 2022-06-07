import Image from "next/image";
import styles from "./Toolbar.module.scss";

const Toolbar = ({ globalData }) => (
  <div className={styles.Toolbar}>
    {console.log("GLO: ", globalData.data.attributes)}Toolbar!
    <div className={styles.Logo}>
      <Image
        src={globalData.data.attributes.logo.data.attributes.url}
        layout="fill"
      />
    </div>
  </div>
);

export default Toolbar;
