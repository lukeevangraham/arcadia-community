import Link from "next/link"

import classes from "./NavigationItems.module.scss";

const NavigationItems = ({ links }) => (
    <nav className={classes.Links}>
      {links.map((link) => (
        <li key={link.id}>
          <Link href={link.url}>
            <a>{link.text}</a>
          </Link>
        </li>
      ))}
    </nav>
)

export default NavigationItems;