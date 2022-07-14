import classes from "./SocialRow.module.scss";

const SocialRow = () => (
  <div className={classes.SocialRow}>
    <div className={classes.SocialRow__EmailAndPhone}>
      <a href="mailto:info@arcadia.church">
        <svg>
          <use xlinkHref="/images/sprite.svg#icon-mail"></use>
        </svg>
        <div>info@arcadia.church</div>
      </a>
      <svg>
        <use xlinkHref="/images/sprite.svg#icon-phone"></use>
      </svg>
      <div>(626) 445-9764</div>
    </div>

    <div className={classes.SocialRow__Social}>
      <a
        href="http://www.facebook.com/arcadiacommunitychurch"
        target={"_blank"}
      >
        <svg>
          <use xlinkHref="/images/sprite.svg#icon-facebook"></use>
        </svg>
      </a>
      <a href="http://www.instagram.com/arcadia_church" target={"_blank"}>
        <svg>
          <use xlinkHref="/images/sprite.svg#icon-instagram"></use>
        </svg>
      </a>
      <a href="http://www.vimeo.com/arcadiacommunitychurch" target={"_blank"}>
        <svg>
          <use xlinkHref="/images/sprite.svg#icon-vimeo"></use>
        </svg>
      </a>
    </div>
  </div>
);

export default SocialRow;
