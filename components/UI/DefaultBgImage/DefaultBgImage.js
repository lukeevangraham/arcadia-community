import classes from "./DefaultBgImage.module.scss";
import Image from "next/image";

const DefaultBgImage = ({ globalData }) => (
  <div className={classes.DefaultBgImage}>
    <div className={classes.DefaultBgImage__Logo}>
      <Image
        src={globalData.data.attributes.Navbar.logo.data.attributes.url}
        alt={
          globalData.data.attributes.Navbar.logo.data.attributes.alternativeText
        }
        layout="fill"
      />
    </div>
  </div>
);

export default DefaultBgImage;
