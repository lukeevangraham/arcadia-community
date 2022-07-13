import Image from "next/image";

import classes from "./PhotoShowcase.module.scss";

const PhotoShowcase = ({ data }) => (
  <section className={classes.PhotoShowcase}>
    <ul className={classes.PhotoShowcase__Group}>
      {data.photos.data.map((photo) => (
        <li key={photo.id}>
          <figure className={classes.PhotoShowcase__Group_Photo}>
            <Image
              src={photo.attributes.url}
              alt={photo.attributes.alternativeText}
              layout="fill"
              objectFit="cover"
              // width={800}
              // height={600}
            />
          </figure>
        </li>
      ))}
    </ul>
  </section>
);

export default PhotoShowcase;
