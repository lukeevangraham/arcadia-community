import Link from "next/link";
import Button from "../../UI/Button/Button";

import classes from "./NavigationItems.module.scss";

const NavigationItems = ({ links, button, fromSideDrawer, searchClicked }) => (
  <nav className={classes.Links}>
    {links.map((link) => (
      <li key={link.id}>
        <Link href={link.url}>
          <a>{link.text}</a>
        </Link>
      </li>
    ))}
    <li className={classes.Links__Search} onClick={searchClicked}>
      <svg>
        <use xlinkHref="/images/sprite.svg#icon-magnifying-glass"></use>
      </svg>
    </li>
    {button ? (
      <div
        className={
          fromSideDrawer
            ? `${classes.Button} ${classes.Button_ml}`
            : classes.Button
        }
      >
        <Button button={button} />
      </div>
    ) : null}
  </nav>
);

export default NavigationItems;
