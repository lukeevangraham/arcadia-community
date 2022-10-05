import { useEffect, useState } from "react";
import classes from "./Countdown.module.scss";

const Countdown = ({ event }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  //   counts to a day and sets the time to 10:30

  function nextDay(x) {
    var now = new Date();
    now.setDate(now.getDate() + ((x + (7 - now.getDay())) % 7));
    now.setHours(10, 30);
    return now;
  }

  const nextSunday = nextDay(0);

  const dateToCountTo = nextSunday.getTime();

  useEffect(() => {
    let timer = setInterval(() => {
      let currentDate = new Date().getTime();
      let seconds_left = (dateToCountTo - currentDate) / 1000;
      setDays(parseInt(seconds_left / 86400));
      seconds_left = seconds_left % 86400;

      setHours(parseInt(seconds_left / 3600));
      seconds_left = seconds_left % 3600;

      setMins(parseInt(seconds_left / 60));
      setSecs(parseInt(seconds_left % 60));
    }, 1000);
    return () => clearInterval(timer);
  }, [dateToCountTo]);

  return (
    <div className={classes.Countdown}>
      <div className={classes.Countdown__Element}>
        <div className={classes.Countdown__Element__num}>{days}</div>
        <div className={classes.Countdown__Element__label}>Day</div>
      </div>
      <div className={classes.Countdown__Element}>
        <div className={classes.Countdown__Element__num}>{hours}</div>
        <div className={classes.Countdown__Element__label}>Hrs</div>
      </div>
      <div className={classes.Countdown__Element}>
        <div className={classes.Countdown__Element__num}>{mins}</div>
        <div className={classes.Countdown__Element__label}>Min</div>
      </div>
      <div className={classes.Countdown__Element}>
        <div className={classes.Countdown__Element__num}>{secs}</div>
        <div className={classes.Countdown__Element__label}>Sec</div>
      </div>
    </div>
  );
};

export default Countdown;
