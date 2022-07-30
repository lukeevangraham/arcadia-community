import Image from "next/image";
import classes from "./Sermon.module.scss";

const Sermon = ({ sermon }) => (
  <div className={classes.Sermon}>
    <div className={classes.Sermon__Image}>
      <a
        href={`https://www.youtube.com/watch?v=${sermon.contentDetails.videoId}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={sermon.snippet.thumbnails.standard.url}
          alt={sermon.snippet.title}
          layout="fill"
          objectFit="cover"
        />
      </a>
    </div>
    <div className={classes.Sermon__Date}>
      <div className={classes.Sermon__Date_day}>
        {new Date(sermon.parsedDate).toLocaleDateString("en-US", {
          day: "numeric",
        })}
      </div>
      <div className={classes.Sermon__Date_month}>
        {new Date(sermon.parsedDate).toLocaleDateString("en-US", {
          month: "short",
        })}
      </div>
    </div>
    <div className={classes.Sermon__Title}>{sermon.title}</div>
    <div className={classes.Sermon__Speaker}>Sermon from: {sermon.speaker}</div>
    {console.log("SERMON: ", sermon)}
  </div>
);

export default Sermon;
