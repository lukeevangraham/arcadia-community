import Image from "next/image";
import Link from "next/link";
import DateBox from "../DateBox/DateBox";

import classes from "./EventCard.module.scss";

export default function EventCard({ event, style }) {
  return (
    <div style={{ ...style, display: "flex", width: "100%" }}>
      <div className={classes.EventCard}>
        <Link href={`/events/${event.attributes.Slug}`}>
          <a>
            <div className={classes.EventCard__image}>
              <Image
                src={event.attributes.image.data.attributes.url}
                layout="fill"
                objectFit="cover"
                alt={event.attributes.image.data.attributes.alternateText}
              />
            </div>
          </a>
        </Link>
        <div className={classes.EventCard__BelowImage}>
          <div>
            <Link href={`/events/${event.attributes.Slug}`}>
              <a>
                <div className={classes.EventCard__title}>
                  <span>{event.attributes.title}</span>
                </div>
              </a>
            </Link>
            <div className={classes.EventCard__BelowImage__timeAndPlace}>
              <div className={classes.EventCard__BelowImage__timeAndPlace_time}>
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-clock"></use>
                </svg>
                <div>
                  {new Date(event.attributes.startDate).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </div>
              </div>
              <div
                className={classes.EventCard__BelowImage__timeAndPlace_place}
              >
                <svg>
                  <use xlinkHref="/images/sprite.svg#icon-location-pin"></use>
                </svg>
                <div>{event.attributes.location}</div>
              </div>
            </div>
          </div>
          <div className={classes.EventCard__BelowImage__dateBox}>
          <DateBox event={event} />
            {/* <div className={classes.EventCard__BelowImage__dateBox_month}>
              {new Date(event.attributes.startDate).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                }
              )}
            </div>
            <div className={classes.EventCard__BelowImage__dateBox_day}>
              {new Date(event.attributes.startDate).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                }
              )}
            </div>
            <div className={classes.EventCard__BelowImage__dateBox_dayOfWeek}>
              {new Date(event.attributes.startDate).toLocaleDateString(
                "en-US",
                {
                  weekday: "short",
                }
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
