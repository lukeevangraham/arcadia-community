import Image from "next/image";

import classes from "./StaffMember.module.scss";

const StaffMember = ({ person }) => (
  <div className={classes.Person}>
    <div className={classes.Person__image}>
      <Image
        src={person.attributes.photo.data.attributes.url}
        alt={person.attributes.photo.data.attributes.alternativeText}
        layout="fill"
      ></Image>
    </div>
    <div>
      {person.attributes.title ? `${person.attributes.title} ` : null}
      {`${person.attributes.firstName} ${person.attributes.lastName}`}
    </div>
  </div>
);

export default StaffMember;
