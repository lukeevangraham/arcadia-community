import { useState } from "react";
import Image from "next/image";
import Modal from "../../UI/Modal/Modal";
import classes from "./Sermon.module.scss";

const Sermon = ({ sermon }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={classes.Sermon}>
      <div className={classes.Sermon__Image} onClick={() => setShowModal(true)}>
        {/* <a
        href={`https://www.youtube.com/watch?v=${sermon.contentDetails.videoId}`}
        target="_blank"
        rel="noreferrer"
      > */}
        <Image
          src={sermon.snippet.thumbnails.standard.url}
          alt={sermon.snippet.title}
          layout="fill"
          objectFit="cover"
        />
        {/* </a> */}
      </div>
      <div className={classes.Sermon__Date}>
        <div className={classes.Sermon__Date_day}>
          {new Date(sermon.parsedDate).toLocaleDateString("en-US", {
            day: "numeric",
          })}
        </div>
        <div className={classes.Sermon__Date_month}>
          {new Date(sermon.parsedDate).toLocaleDateString("en-US", {
            month: "short",
          })}
        </div>
      </div>
      <div className={classes.Sermon__Title} onClick={() => setShowModal(true)}>{sermon.title}</div>
      <div className={classes.Sermon__Speaker}>
        Sermon from: {sermon.speaker}
      </div>
      <Modal show={showModal} modalClosed={() => setShowModal(false)}>
        <div className={classes.Modal}>
          <div className={classes.Modal__TopBar}>
            <div className={classes.Modal__TopBar_title}>{sermon.title}</div>
            <fig
              className={classes.Modal__TopBar_close}
              onClick={() => setShowModal(false)}
            >
              &times;
            </fig>
          </div>

          <iframe
            src={`https://www.youtube.com/embed/${sermon.contentDetails.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ width: "100%", aspectRatio: "16 / 9" }}
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default Sermon;
