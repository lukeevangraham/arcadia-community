import Image from "next/image";

import classes from "./PhotoShowcase.module.scss";

const PhotoShowcase = ({ data }) => (
  <section className={classes.PhotoShowcase}>
    <ul className={classes.PhotoShowcase__Group}>
      {data.photos.data.map((photo, index, array) => (
        // calculate how wide the pictures should be
        <li key={photo.id} style={{ width: `${100 / (array.length / 2)}%` }}>
          <figure className={classes.PhotoShowcase__Group_Photo}>
            <Image
              src={photo.attributes.url}
              alt={photo.attributes.alternativeText}
              layout="fill"
              objectFit="cover"
            />
          </figure>
        </li>
      ))}
    </ul>
  </section>
);

export default PhotoShowcase;
