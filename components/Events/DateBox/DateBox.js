import classes from "./DateBox.module.scss";

const DateBox = ({ event }) => (
  <>
    <div className={classes.DateBox_month}>
      {new Date(event.attributes.startDate).toLocaleDateString("en-US", {
        month: "short",
      })}
    </div>
    <div className={classes.DateBox_day}>
      {new Date(event.attributes.startDate).toLocaleDateString("en-US", {
        day: "numeric",
      })}
    </div>
    <div className={classes.DateBox_dayOfWeek}>
      {new Date(event.attributes.startDate).toLocaleDateString("en-US", {
        weekday: "short",
      })}
    </div>
  </>
);

export default DateBox;
