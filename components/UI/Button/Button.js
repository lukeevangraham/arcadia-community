import classNames from "classnames";
import Link from "next/link";

import classes from "./Button.module.scss";

const Button = ({ button }) => (
  <Link href={button.url}>
    {button.newTab ? (
      <a
        target="_blank"
        className={classNames(classes.Button, {
          [classes.Button__primary]: button.type === "primary",
          [classes.Button__secondary]: button.type === "secondary",
        })}
      >
        {button.text}
      </a>
    ) : (
      <a
        className={classNames(classes.Button, {
          [classes.Button__primary]: button.type === "primary",
          [classes.Button__secondary]: button.type === "secondary",
        })}
      >
        {button.text}
      </a>
    )}
  </Link>
);

export default Button;
