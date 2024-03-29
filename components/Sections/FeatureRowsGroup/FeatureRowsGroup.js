import Image from "next/image";
import Button from "../../UI/Button/Button";
import Fade from "react-reveal/Fade";
import classes from "./FeatureRowsGroup.module.scss";

const FeatureRowsGroup = ({ data }) => (
  <>
    {data.FeatureRow.map((row) => (
      <div key={row.id} className={classes.FeatureRow}>
        <div className={classes.FeatureRow__pictures}>
          {row.bgImage.data ? (
            <div className={classes.FeatureRow__pictures_bg}>
              <Image
                src={row.bgImage.data.attributes.url}
                alt={row.bgImage.data.attributes.alternativeText}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : null}
          {row.middleImage.data ? (
            <div className={`${classes.FeatureRow__pictures_1}`}>
              <Image
                src={row.middleImage.data.attributes.url}
                alt={row.middleImage.data.attributes.alternativeText}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : null}
          {row.middleImage.data ? (
            <div className={classes.FeatureRow__pictures_2}>
              <Image
                src={row.topImage.data.attributes.url}
                alt={row.topImage.data.attributes.alternativeText}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : null}
        </div>
        <Fade bottom duration={1500}>
          <div className={classes.FeatureRow__Text}>
            <h4>{row.smallHeading}</h4>
            <h2>{row.title}</h2>
            <p>{row.description}</p>
            <div className={classes.FeatureRow__Text_buttonRow}>
              {row.Button.map((button) => (
                <Button key={button.id} button={button} />
              ))}
            </div>
          </div>
        </Fade>
      </div>
    ))}
  </>
);

export default FeatureRowsGroup;
