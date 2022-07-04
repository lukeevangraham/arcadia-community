import Image from "next/image";

import classes from "./StaffMember.module.scss";

const StaffMember = ({ person }) => (
  <div className={classes.Person}>
    <div className={classes.Person__image}>
      <Image
        src={person.attributes.photo.data.attributes.url}
        alt={person.attributes.photo.data.attributes.alternativeText}
        layout="fill"
        objectFit="cover"
      ></Image>
    </div>
    <div className={classes.Person__text}>
      <div className={classes.Person__text_name}>
        {person.attributes.title ? `${person.attributes.title} ` : null}
        {`${person.attributes.firstName} ${person.attributes.lastName}`}
      </div>
      <div  className={classes.Person__text_title}>{person.attributes.jobTitle}</div>
    </div>
  </div>
);

export default StaffMember;
