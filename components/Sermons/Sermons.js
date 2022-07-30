import Sermon from "./Sermon/Sermon";

import classes from "./Sermons.module.scss";

const Sermons = ({ sermons }) => (
  <>
    <div className={classes.Sermons}>
      <div className="row u-padding-top-medium u-padding-bottom-medium">
      <div className="u-section-heading">
              <h2>Sermons Today</h2>
              <h4>&quot;Heaven and earth will pass away, but my words will not pass away.&quot; Matthew 24:35</h4>
            </div>
        <div className={classes.Sermons__Wrapper}>
          {sermons.map((sermon, index) => (
            <Sermon key={index} sermon={sermon} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Sermons;
