import React, { useState, useEffect, useCallback } from "react";
import styles from "./Category.module.scss";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import UserCardWrite from "../../Store/UserCard/UserCardWrite";
import Waveform from "../Waveform/Waveform";
import { Modal, message } from "antd";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";

const Category = React.memo(() => {
  UserCardWrite();
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { userCard } = useSelector((state) => state.userCard);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopy, setCopy] = useState(false);
  const shareUrl = window.location.href;

  useEffect(() => {
    if (isCopy) {
      message.success(lang === "ru" ? "Скопировано" : "Nusxalandi");
      setCopy(false);
      setIsModalOpen(false);
    }
  }, [isCopy]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePlay = useCallback(
    (audio) => {
      if (audio.id === currentPlaying) {
        setCurrentPlaying(null);
      } else {
        setCurrentPlaying(audio.id);
      }
    },
    [currentPlaying]
  );

  const handlePause = useCallback(() => {
    setCurrentPlaying(null);
  }, []);

  const { innerWidth: width } = window;

  const [Width, setWidth] = useState(width);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <section
      className={
        themeList ? styles.category__section : styles.category__sectionDark
      }
    >
      <div className="container">
        {userCard[lang] !== undefined ? (
          <div className={styles.category__box} key={userCard._id}>
            <div className={styles.category__top}>
              <img
                className={styles.category__image}
                src={`${
                  Width <= 855
                    ? userCard[lang].smallimage
                    : userCard[lang].image
                }`}
                width={400}
                height={400}
                alt="photo"
              />
              <div className={styles.category__content}>
                <div>
                  <div className={styles.category__nameBox}>
                    <div className={styles.category__nmB}>
                      <p className={styles.category__firstName}>
                        {userCard[lang].firstname}
                      </p>
                      <p className={styles.category__lastName}>
                        {userCard[lang].lastname}
                      </p>
                    </div>
                    <div className={styles.category__linkList}>
                      <a
                        className={styles.category__insta}
                        href={userCard[lang].instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={30}
                          height={30}
                          viewBox="0 0 50 50"
                          fill="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M16 3C8.83 3 3 8.83 3 16v18c0 7.17 5.83 13 13 13h18c7.17 0 13-5.83 13-13V16c0-7.17-5.83-13-13-13H16zm21 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-12 3c6.07 0 11 4.93 11 11s-4.93 11-11 11-11-4.93-11-11 4.93-11 11-11zm0 2c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9z"
                          />
                        </svg>
                      </a>
                      <button className={styles.category__similar}>
                        <svg
                          width={27}
                          height={27}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 3H3v18h5v2H1V1h7v2Zm13 0h-5V1h7v22h-7v-2h5V3Zm-10.55 7.72-1.25 3a1.33 1.33 0 0 1-2.42.08L5.38 11H4V9h1.8c.5 0 .96.29 1.19.74l.93 1.86 1.33-3.2a1.33 1.33 0 0 1 2.48.04l1.82 4.84 1.23-2.96a1.33 1.33 0 0 1 2.45-.04L18.48 13H20v2h-1.95c-.52 0-1-.3-1.21-.78l-.8-1.72-1.3 3.1a1.33 1.33 0 0 1-2.47-.04l-1.82-4.84Z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className={styles.category__share}
                        onClick={showModal}
                      >
                        <svg
                          width={27}
                          height={27}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.6495 0.799565C18.4834 -0.72981 16.0093 0.081426 16.0093 1.99313V3.91272C12.2371 3.86807 9.65665 5.16473 7.9378 6.97554C6.10034 8.9113 5.34458 11.3314 5.02788 12.9862C4.86954 13.8135 5.41223 14.4138 5.98257 14.6211C6.52743 14.8191 7.25549 14.7343 7.74136 14.1789C9.12036 12.6027 11.7995 10.4028 16.0093 10.5464V13.0069C16.0093 14.9186 18.4834 15.7298 19.6495 14.2004L23.3933 9.29034C24.2022 8.2294 24.2022 6.7706 23.3933 5.70966L19.6495 0.799565ZM7.48201 11.6095C9.28721 10.0341 11.8785 8.55568 16.0093 8.55568H17.0207C17.5792 8.55568 18.0319 9.00103 18.0319 9.55037L18.0317 13.0069L21.7754 8.09678C22.0451 7.74313 22.0451 7.25687 21.7754 6.90322L18.0317 1.99313V4.90738C18.0317 5.4567 17.579 5.90201 17.0205 5.90201H16.0093C11.4593 5.90201 9.41596 8.33314 9.41596 8.33314C8.47524 9.32418 7.86984 10.502 7.48201 11.6095Z"
                            fill="currentColor"
                          />
                          <path
                            d="M7 1.00391H4C2.34315 1.00391 1 2.34705 1 4.00391V20.0039C1 21.6608 2.34315 23.0039 4 23.0039H20C21.6569 23.0039 23 21.6608 23 20.0039V17.0039C23 16.4516 22.5523 16.0039 22 16.0039C21.4477 16.0039 21 16.4516 21 17.0039V20.0039C21 20.5562 20.5523 21.0039 20 21.0039H4C3.44772 21.0039 3 20.5562 3 20.0039V4.00391C3 3.45162 3.44772 3.00391 4 3.00391H7C7.55228 3.00391 8 2.55619 8 2.00391C8 1.45162 7.55228 1.00391 7 1.00391Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                    <Modal
                      title={lang === "ru" ? "Поделиться" : "Baham ko'ring"}
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer
                    >
                      <div className="w-full flex items-center justify-around my-4">
                        <EmailShareButton url={shareUrl} onClick={handleCancel}>
                          <EmailIcon size={52} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton
                          url={shareUrl}
                          onClick={handleCancel}
                        >
                          <FacebookIcon size={52} round={true} />
                        </FacebookShareButton>
                        <LinkedinShareButton
                          url={shareUrl}
                          onClick={handleCancel}
                        >
                          <LinkedinIcon size={52} round={true} />
                        </LinkedinShareButton>
                        <TelegramShareButton
                          url={shareUrl}
                          onClick={handleCancel}
                        >
                          <TelegramIcon size={52} round={true} />
                        </TelegramShareButton>
                        <TwitterShareButton
                          url={shareUrl}
                          onClick={handleCancel}
                        >
                          <XIcon size={52} round={true} />
                        </TwitterShareButton>
                      </div>
                      <CopyToClipboard
                        text={shareUrl}
                        onCopy={() => setCopy(true)}
                      >
                        <span className={styles.copy__btn}>
                          {lang === "ru" ? "Копировать" : "Nusxalash"}
                        </span>
                      </CopyToClipboard>
                    </Modal>
                  </div>
                  <p className={styles.category__description}>
                    {userCard[lang].description}
                  </p>
                </div>
                <video
                  className={styles.category__video}
                  id="video1"
                  controls
                  disablePictureInPicture
                  controlsList="nofullscreen noplaybackrate nodownload"
                >
                  <source src={userCard[lang].video} />
                </video>
              </div>
            </div>
            <video
              className={styles.category__video2}
              id="video1"
              controls
              disablePictureInPicture
              controlsList="nofullscreen noplaybackrate nodownload"
            >
              <source src={userCard[lang].video} />
            </video>
            <ul className={styles.category__canter}>
              {userCard[lang].audios.map((audio) => (
                <Waveform
                  key={audio.id}
                  el={audio}
                  isPlaying={audio.id === currentPlaying}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  yourAudioArray={userCard[lang].audios}
                  currentPlaying={currentPlaying}
                />
              ))}
            </ul>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
});

export default Category;
