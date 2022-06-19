import Image from "next/image";

import classes from "./Footer.module.scss";

const Footer = ({ globalData }) => (
  <footer className={classes.Footer}>
    <div className={classes.Footer__columns__Logo}>
          <Image
            src={globalData.data.attributes.Navbar.logo.data.attributes.url}
            alt={
              globalData.data.attributes.Navbar.logo.data.attributes
                .alternativeText
            }
            layout="fill"
          />
        </div>
    <div className={classes.Footer__columns}>
      <div>
          <div className={classes.Footer__columns_header}>Arcadia Community Church</div>
        <div>121 Alice Street</div>
        <div>Arcadia, CA 91006</div>
      </div>
      <div>
        <div className={classes.Footer__columns_header}>Service Info</div>
        <div>Sunday Service &mdash; 10:30 am</div>
      </div>
    </div>
    <div className={classes.Footer__bottomText}>
      &copy; {new Date().getFullYear()} Arcadia Community Church
      <div className={classes.Footer__bottomText_gww}>
        {" "}
        <a href="http://grahamwebworks.com" target="_blank">
          Graham Web Works
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
