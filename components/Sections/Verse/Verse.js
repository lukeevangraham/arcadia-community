import Image from "next/image";

import classes from "./Verse.module.scss";

const Verse = ({ globalData, data }) => (
  <div className={classes.Verse}>
    <div className={classes.Verse__Text}>
      <h4>{data.text}</h4>
      <div className={classes.Verse__Text__Ref}>{data.Reference}</div>
    </div>
    <div className={classes.Verse__Logo}>
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

export default Verse;
