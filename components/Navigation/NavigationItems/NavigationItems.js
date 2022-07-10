import Link from "next/link";
import Button from "../../UI/Button/Button";

import classes from "./NavigationItems.module.scss";

const NavigationItems = ({ links, button }) => (
  <nav className={classes.Links}>
    {links.map((link) => (
      <li key={link.id}>
        <Link href={link.url}>
          <a>{link.text}</a>
        </Link>
      </li>
    ))}
    {button ? (
      <div className={classes.Button}>
        <Button button={button} />
      </div>
    ) : null}
  </nav>
);

export default NavigationItems;
