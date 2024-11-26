import Image from "next/image";
import Link from "next/link";
import Subscribe from "../Footer/Subscribe/Subscribe";

import classes from "./Footer.module.scss";

const Footer = ({ globalData }) => (
  <footer className={classes.Footer}>
    <div className={classes.Footer__columns__Logo}>
      <Link href={"/"}>
        <Image
          src={globalData.data.attributes.Navbar.logo.data.attributes.url}
          alt={
            globalData.data.attributes.Navbar.logo.data.attributes
              .alternativeText
          }
          layout="fill"
        />
      </Link>
    </div>
    <div className={classes.Footer__columns}>
      <div>
        <Link href={"/"}>
          <a>
            <div className={classes.Footer__columns_header}>
              Journey Community Church
            </div>
          </a>
        </Link>
        <div>121 Alice Street</div>
        <div className="u-margin-bottom-small">Arcadia, CA 91006</div>
        <div className={classes.Footer__columns_email}>
          <a href="mailto:info@arcadia.church">
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-mail"></use>
            </svg>
            <div>info@arcadia.church</div>
          </a>
        </div>
        <div
          className={`${classes.Footer__columns_phone} u-margin-bottom-small`}
        >
          <svg>
            <use xlinkHref="/images/sprite.svg#icon-phone"></use>
          </svg>
          <div>(626) 445-7470</div>
        </div>
        <h4>Service Info</h4>
        <div>Sunday Service &mdash; 10:30 am</div>
      </div>
      <div>
        <h4>Useful Links</h4>
        <ul>
          {globalData.data.attributes.Navbar.links.map((link) => (
            <li key={link.id}>
              <Link href={link.url}>
                <a>{link.text}</a>
              </Link>
            </li>
          ))}
          <li>
            <Link href={globalData.data.attributes.Navbar.button.url}>
              {globalData.data.attributes.Navbar.button.text}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4>More from ACC</h4>
        <ul>
          {globalData.data.attributes.pages.data.map((page) => (
            <li key={page.id}>
              <Link href={`/pages/${page.attributes.slug}`}>
                <a>{page.attributes.shortName}</a>
              </Link>
            </li>
          ))}
          <li>
            <Link href={"/jobs"}>
              <a>Job Openings</a>
            </Link>
          </li>
          <li>
            <Link href={"/prayer"}>
              <a>Request Prayer</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.Footer__columns__subscribe}>
        <h4>Subscribe</h4>
        <div>
          Receive our email newsletter to get helpful content and keep up to
          date with our happenings.
        </div>
        <Subscribe />
        <div className={classes.Footer__columns__subscribe__watch}>
          <h4>Watch</h4>
          <ul>
            <li>
              <a
                href="https://www.youtube.com/playlist?list=PLchW5rz4AxRIYM075lL7iNFXNiyvS46Kd"
                target="blank"
                rel="noreferrer"
              >
                Sermon Archive
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/playlist?list=PLchW5rz4AxRI3q73zPOnHzdAYcO1k7Djh"
                target="_blank"
                rel="noreferrer"
              >
                Livestream Archive
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className={classes.Footer__bottomText}>
      <div>&copy; {new Date().getFullYear()} Journey Community Church</div>
      <div className={classes.Footer__bottomText_gww}>
        <a rel="noreferrer" href="http://grahamwebworks.com" target="_blank">
          Graham Web Works
        </a>
      </div>
      <div className={classes.Footer__bottomText__social}>
        <a
          href="http://www.facebook.com/arcadiacommunitychurch"
          target={"_blank"}
          rel="noreferrer"
        >
          <svg>
            <use xlinkHref="/images/sprite.svg#icon-facebook"></use>
          </svg>
        </a>
        <a
          href="http://www.instagram.com/arcadia_church"
          target={"_blank"}
          rel="noreferrer"
        >
          <svg>
            <use xlinkHref="/images/sprite.svg#icon-instagram"></use>
          </svg>
        </a>
        <a
          href="http://www.vimeo.com/arcadiacommunitychurch"
          target={"_blank"}
          rel="noreferrer"
        >
          <svg>
            <use xlinkHref="/images/sprite.svg#icon-vimeo"></use>
          </svg>
        </a>
        <a
          href="https://www.youtube.com/channel/UCmQ2luPyV1EFmghznWebCPA"
          target={"_blank"}
          rel="noreferrer"
        >
          <svg>
            <use xlinkHref="/images/sprite.svg#icon-youtube"></use>
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
