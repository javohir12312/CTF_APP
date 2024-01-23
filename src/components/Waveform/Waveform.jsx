import React, { useState, useEffect, useCallback } from "react";
import styles from "./Waveform.module.scss";
import WaveSurfer from "wavesurfer.js";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";

const Waveform = React.memo(
  ({ el, isPlaying, onPlay, onPause, yourAudioArray, currentPlaying }) => {
    const { themeList } = useSelector((state) => state.theme);
    const [playing, setPlaying] = useState(false);
    const [waveform, setWaveform] = useState(null);
    const [duration, setDuration] = useState("0:00");
    const [process, setProcess] = useState("0:00");
    const [waveColor, setwaveColor] = useState("#494949");
    const [progressColor, setprogressColor] = useState("#B8B8B8");

    useEffect(() => {
      if (!themeList) {
        setwaveColor("#494949");
        setprogressColor("#B8B8B8");
      } else {
        setwaveColor("#6c6c6c");
        setprogressColor("#3f3f3f");
      }
    }, [themeList]);

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

    const initializeWaveform = useCallback(() => {
      const newWaveform = WaveSurfer.create({
        container: `#waveform-${el.id}`,
        waveColor: waveColor,
        progressColor: progressColor,
        height: 60,
        barRadius: 4,
      });

      newWaveform.load(el.audio);

      setWaveform(newWaveform);

      return () => {
        if (newWaveform) {
          newWaveform.destroy();
        }
      };
    }, [waveColor, progressColor, el.id, el.audio]);

    useEffect(() => {
      const cleanupWaveform = initializeWaveform();

      return () => {
        cleanupWaveform();
      };
    }, [initializeWaveform]);

    useEffect(() => {
      if (isPlaying && el.id === currentPlaying) {
        setPlaying(true);
        waveform?.play();
      } else {
        setPlaying(false);
        waveform?.pause();
      }
    }, [isPlaying, waveform, el.id, currentPlaying]);

    const handlePlay = useCallback(() => {
      setPlaying(true);
      onPlay(el);
    }, [el, onPlay]);

    const handlePause = useCallback(() => {
      setPlaying(false);
      onPause();
    }, [onPause]);

    const [currentAudioId, setCurrentAudioId] = useState(null);

    useEffect(() => {
      const handleKeyDown = (event) => {
        switch (event.code) {
          case "Space":
            event.preventDefault();
            if (playing && currentAudioId === el.id) {
              handlePause();
            } else {
              handlePlay();
            }
            break;
          case "ArrowLeft":
            if (playing && currentAudioId === el.id) {
              waveform.skip(-5);
            }
            break;
          case "ArrowRight":
            if (playing && currentAudioId === el.id) {
              waveform.skip(5);
            }
            break;
          case "ArrowUp":
            if (playing && currentAudioId === el.id) {
              const currentIndex = yourAudioArray.findIndex(
                (audio) => audio.id === el.id
              );
              if (currentIndex > 0) {
                const previousAudio = yourAudioArray[currentIndex - 1];
                setProcess("0:00");
                waveform.seekTo(0);
                handlePause();
                onPlay(previousAudio);
              }
            }
            break;
          case "ArrowDown":
            if (playing && currentAudioId === el.id) {
              const currentIndex = yourAudioArray.findIndex(
                (audio) => audio.id === el.id
              );
              if (currentIndex < yourAudioArray.length - 1) {
                const nextAudio = yourAudioArray[currentIndex + 1];
                setProcess("0:00");
                waveform.seekTo(0);
                handlePause();
                onPlay(nextAudio);
              }
            }
            break;
          default:
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [
      onPlay,
      playing,
      handlePlay,
      handlePause,
      waveform,
      currentAudioId,
      el.id,
      yourAudioArray,
    ]);

    useEffect(() => {
      setCurrentAudioId(el.id);
    }, [el.id]);

    const timeCalculator = (value) => {
      let minutes = Math.floor(value / 60);
      let seconds = Math.floor(value % 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return minutes + ":" + seconds;
    };

    useEffect(() => {
      if (waveform) {
        waveform.on("ready", function () {
          setDuration(timeCalculator(waveform.getDuration()));
        });
        waveform.on("audioprocess", function () {
          setProcess(timeCalculator(waveform.getCurrentTime()));
        });
        waveform.on("finish", function () {
          setPlaying(false);
          if (playing && currentAudioId === el.id) {
            setProcess("0:00");
            waveform.seekTo(0);
            handlePause();
          }
        });
      }

      return () => {
        if (waveform) {
          waveform.un("ready");
          waveform.un("audioprocess");
          waveform.un("finish");
        }
      };
    }, [handlePause, waveform, playing, currentAudioId, el.id]);

    return (
      <>
        {waveform === undefined ? (
          <Loading />
        ) : (
          <li
            className={
              themeList ? styles.wavefrom__item : styles.wavefrom__itemDark
            }
          >
            <div className={styles.wavefrom__audioBox}>
              <div className={styles.wavefrom__controller}>
                <div className={styles.wavefrom__textContent}>
                  <h3 className={styles.wavefrom__title}>{el.title}</h3>
                  <p className={styles.wavefrom__desc}>{el.description}</p>
                </div>
                <div className={styles.wavefrom__minutSecond}>
                  <span>{process}</span> {" / "} <span>{duration}</span>
                </div>
              </div>
              <div className={styles.wavefrom__box}>
                <div
                  className={styles.wavefrom__btn}
                  onClick={playing ? handlePause : handlePlay}
                >
                  {playing ? (
                    <svg
                      fill="currentColor"
                      height="80px"
                      width="80px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M256,0C114.617,0,0,114.615,0,256s114.617,256,256,256s256-114.615,256-256S397.383,0,256,0z M224,320
c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z M352,320
c0,8.836-7.164,16-16,16h-32c-8.836,0-16-7.164-16-16V192c0-8.836,7.164-16,16-16h32c8.836,0,16,7.164,16,16V320z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="80"
                      height="80"
                      viewBox="0 0 56 56"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 28.0162C0 12.5615 12.5676 0 28 0C43.4324 0 56 12.5615 56 28.0162C56 43.4385 43.4324 56 28 56C12.5676 56 0 43.4385 0 28.0162ZM38.2703 30.85C38.5676 30.5528 38.946 30.0936 39.0271 29.9855C39.4595 29.4182 39.6757 28.7159 39.6757 28.0162C39.6757 27.2301 39.4325 26.5007 38.973 25.9064C38.9353 25.8688 38.8616 25.7885 38.7655 25.6839C38.5857 25.4882 38.3277 25.2074 38.0811 24.9609C35.8649 22.5837 30.0811 18.6937 27.0541 17.5051C26.5946 17.3187 25.4325 16.9108 24.8108 16.8837C24.2162 16.8837 23.6487 17.0188 23.1081 17.289C22.4325 17.6671 21.8919 18.2615 21.5946 18.9638C21.4054 19.4501 21.1081 20.9088 21.1081 20.9358C20.8108 22.5297 20.6487 25.123 20.6487 27.9865C20.6487 30.7176 20.8108 33.2002 21.0541 34.821C21.0608 34.8277 21.084 34.9436 21.1201 35.1237C21.2299 35.6712 21.4587 36.8118 21.7027 37.2793C22.2973 38.4139 23.4595 39.1163 24.7027 39.1163H24.8108C25.6217 39.0892 27.3244 38.3869 27.3244 38.3599C30.1892 37.1712 35.8379 33.4703 38.1081 31.0121L38.2703 30.85Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>
                <div
                  className={styles.wavefrom__wave}
                  id={`waveform-${el.id}`}
                />
              </div>
            </div>
          </li>
        )}
      </>
    );
  }
);

export default Waveform;