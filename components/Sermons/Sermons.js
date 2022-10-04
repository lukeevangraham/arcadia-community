import Sermon from "./Sermon/Sermon";
import Fade from "react-reveal/Fade";

import classes from "./Sermons.module.scss";

const Sermons = ({ sermons }) => (
  <div className={classes.Sermons}>
    <div className="row u-padding-top-medium u-padding-bottom-medium">
      <Fade bottom>
        <div className="u-section-heading">
          <h2>Sermons Today</h2>
          <h4>
            &quot;Heaven and earth will pass away, but my words will not pass
            away.&quot; Matthew 24:35
          </h4>
        </div>
      </Fade>
      <Fade bottom duration={1500} cascade>
        <div className={classes.Sermons__Wrapper}>
          {sermons.map((sermon, index) => (
            <Sermon key={index} sermon={sermon} />
          ))}
        </div>
      </Fade>
    </div>
  </div>
);

export default Sermons;
