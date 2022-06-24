import Image from "next/image";

import classes from "./EventCard.module.scss";

export default function EventCard({ event }) {
  return (
    <>
      <div className={classes.EventCard}>
        <div className={classes.EventCard__image}>
          <Image
            src={event.attributes.image.data.attributes.url}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {console.log("CARD: ", event)}
        <div className={classes.EventCard__title}>
          <span>{event.attributes.title}</span>
        </div>
      </div>
    </>
  );
}
