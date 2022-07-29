import Link from "next/link";
import Image from "next/image";
import DefaultBgImage from "../UI/DefaultBgImage/DefaultBgImage";

import classes from "./MinistryCard.module.scss";

const MinistryCard = ({ ministry, globalData }) => {
  const renderMinCardInterior = (
    <div className={classes.MinistryCard}>
      <div className={classes.MinistryCard_Image}>
        {ministry.attributes.primaryPhoto.data ? (
          <Image
            src={ministry.attributes.primaryPhoto.data.attributes.url}
            alt={ministry.attributes.primaryPhoto.data.attributes.alternateText}
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
  );

  return (
    <div key={ministry.id} className={classes.MinistryCard}>
      {ministry.attributes.RedirectToAnotherSite ? (
        <a href={ministry.attributes.RedirectToAnotherSite} target="_blank">
          {renderMinCardInterior}
        </a>
      ) : (
        <Link href={`/ministry/${ministry.attributes.Slug}`}>
          <a>{renderMinCardInterior}</a>
        </Link>
        // <div>Fail</div>
      )}
    </div>
  );
};

export default MinistryCard;
