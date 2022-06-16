import Image from "next/image";
import classes from "./FeatureRowsGroup.module.scss";

const FeatureRowsGroup = ({ data }) => (
  <>
    {data.FeatureRow.map((row) => (
      <div key={row.id} className={classes.FeatureRow}>
        {console.log("ROW: ", row)}
        <div className={classes.FeatureRow__pictures}>
          <div className={classes.FeatureRow__pictures_bg}>
            <Image
              src={row.bgImage.data.attributes.url}
              alt={row.bgImage.data.attributes.alternativeText}
              layout="fill"
            />
          </div>
          <div className={classes.FeatureRow__pictures_1}>
            <Image
              src={row.middleImage.data.attributes.url}
              alt={row.middleImage.data.attributes.alternativeText}
              layout="fill"
            />
          </div>
          <div className={classes.FeatureRow__pictures_2}>
            <Image
              src={row.topImage.data.attributes.url}
              alt={row.topImage.data.attributes.alternativeText}
              layout="fill"
            />
          </div>
        </div>
        <div>Text</div>
      </div>
    ))}
  </>
);

export default FeatureRowsGroup;
