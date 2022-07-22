import Link from "next/link";
import Image from "next/image";
import DefaultBgImage from "../UI/DefaultBgImage/DefaultBgImage";

import classes from "./MinistryCard.module.scss";

const MinistryCard = ({ ministry, globalData }) => (
  <div key={ministry.id}>
    <Link href={`/ministry/${ministry.attributes.Slug}`}>
      <a>
        <div className={classes.MinistryCard}>
          <div className={classes.MinistryCard_Image}>
            {ministry.attributes.primaryPhoto.data ? (
              <Image
                src={ministry.attributes.primaryPhoto.data.attributes.url}
                alt={
                  ministry.attributes.primaryPhoto.data.attributes.alternateText
                }
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <DefaultBgImage globalData={globalData} />
            )}
          </div>
          <div className={classes.MinistryCard_Color}></div>
          <h3 className={classes.MinistryCard_Name}>
            {ministry.attributes.ministryName}
          </h3>
        </div>
      </a>
    </Link>
  </div>
);

export default MinistryCard;