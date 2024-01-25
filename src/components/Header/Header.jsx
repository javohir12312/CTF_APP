import React, { useEffect, useState } from "react";
import "./darkMode.scss";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Forimage } from "../../server/api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch, useSelector } from "react-redux";
import { editTheme } from "../../Store/Theme/Theme";
import { editLang } from "../../Store/Lang/Lang";
import Loading from "../Loading/Loading";
import moon from "../../assets/moon.png";
import sun from "../../assets/sun.png";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
const elBody = document.getElementById("root");

const Header = React.memo(() => {
  const { logoList } = useSelector((state) => state.logo);
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { phoneInsta } = useSelector((state) => state.phoneInsta);
  const [scroll, setScroll] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (themeList) {
      elBody.classList.add("light");
    } else {
      elBody.classList.remove("light");
    }
  }, [themeList]);

  useEffect(() => {
    if (scroll) {
      elBody.classList.add("stop");
    } else {
      elBody.classList.remove("stop");
    }
  }, [scroll]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setScroll(!scroll);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleCheckboxChange = () => {
    dispatch(editTheme(!themeList));
    handleLinkClick();
  };

  const handleLangChange = (value) => {
    dispatch(editLang(value));
    handleLinkClick();
  };

  const menuItems = (
    <MenuItem delay={`${0.1}s`}>
      <li className={styles.header__item}>
        <Link
          className={styles.header__link}
          to={"voices"}
          onClick={handleLinkClick}
        >
          {lang === "ru" ? "Голоса" : "Ovozlar"}{" "}
          <span className={styles.link__line}></span>
        </Link>
      </li>
      <li className={styles.header__item}>
        <label className={styles.select}>
          <select
            value={lang}
            onChange={(evt) => handleLangChange(evt.target.value)}
          >
            <option value="ru">Ru</option>
            <option value="uz">Uz</option>
          </select>
        </label>
      </li>
      <li className={styles.header__item}>
        {phoneInsta?.map((el) => {
          return (
            <div className={styles.header__linkList} key={el._id}>
              <a
                className={styles.header__tel}
                href={`tel:+998${el.number}`}
                onClick={handleLinkClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  hanging={25}
                  viewBox="0 0 122.88 122.27"
                  fill="currentColor"
                >
                  <path
                    fill="currentColor"
                    d="M33.84 50.25c4.13 7.45 8.89 14.6 15.07 21.12C55.11 77.93 62.82 83.9 72.8 89c.74.36 1.44.36 2.07.11.95-.36 1.92-1.15 2.87-2.1.74-.74 1.66-1.92 2.62-3.21 3.84-5.05 8.59-11.32 15.3-8.18.15.07.26.15.41.21l22.38 12.87c.07.04.15.11.21.15 2.95 2.03 4.17 5.16 4.2 8.71 0 3.61-1.33 7.67-3.28 11.1-2.58 4.53-6.38 7.53-10.76 9.51-4.17 1.92-8.81 2.95-13.27 3.61-7 1.03-13.56.37-20.27-1.69-6.56-2.03-13.17-5.38-20.39-9.84l-.53-.34c-3.31-2.07-6.89-4.28-10.4-6.89-12.84-9.7-25.93-23.71-34.46-39.13C2.35 50.95-1.55 36.98.58 23.67c1.18-7.3 4.31-13.94 9.77-18.32C15.11 1.51 21.52-.59 29.82.15c.95.07 1.8.62 2.25 1.44l14.35 24.26c2.1 2.72 2.36 5.42 1.21 8.12-.95 2.21-2.87 4.25-5.49 6.15-.77.66-1.69 1.33-2.66 2.03-3.21 2.33-6.86 5.02-5.61 8.18l-.03-.08z"
                  />
                </svg>
              </a>
              <a
                className={styles.header__insta}
                href={el.instagram}
                target="blank"
                onClick={handleLinkClick}
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
            </div>
          );
        })}
        <div className={styles.checkBoxTheme}>
          <input
            type="checkbox"
            className={styles.checkbox}
            id="checkbox"
            checked={themeList}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="checkbox"
            className={`${styles.label} ${
              themeList ? "day-mode" : "night-mode"
            }`}
          >
            <img
              className={styles.moon}
              src={moon}
              width={16}
              height={16}
              alt=""
            />
            <img
              className={styles.sun}
              src={sun}
              width={16}
              height={16}
              alt=""
            />
            <div className={styles.ball} />
          </label>
        </div>
      </li>
    </MenuItem>
  );

  return (
    <>
      <header className={themeList ? styles.headerWhite : styles.header}>
        <div className="container">
          <div className={styles.header__box}>
            {logoList.length !== 0 ? (
              logoList?.map((el) => {
                return (
                  <Link
                    to={"/"}
                    className={styles.header__logoLink}
                    href="#"
                    key={el._id}
                  >
                    <img
                      className={styles.header__image}
                      width={50}
                      height={50}
                      src={`${Forimage}${themeList ? el.dark : el.light}`}
                      alt="site logo"
                    />
                  </Link>
                );
              })
            ) : (
              <Loading />
            )}
            <ul className={styles.header__list}>
              <li className={styles.header__item}>
                <Link className={styles.header__link} to={"voices"}>
                  {lang === "ru" ? "Голоса" : "Ovozlar"}{" "}
                  <span className={styles.link__line}></span>
                </Link>
              </li>
              <li className={styles.header__item}>
                <div className={styles.search__box}>
                  <div className={styles.header__searchIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 25 25"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 10.8374C0 4.85208 4.80043 0 10.7221 0C13.5657 0 16.2929 1.1418 18.3037 3.17421C20.3145 5.20661 21.4441 7.96315 21.4441 10.8374C21.4441 16.8228 16.6437 21.6748 10.7221 21.6748C4.80043 21.6748 0 16.8228 0 10.8374ZM21.2666 19.5679L24.5154 22.1456C25.1615 22.7986 25.1615 23.8573 24.5154 24.5103C23.8694 25.1633 22.8219 25.1633 22.1758 24.5103L19.5258 21.4731C19.2753 21.2208 19.1345 20.878 19.1345 20.5205C19.1345 20.163 19.2753 19.8202 19.5258 19.5679C20.009 19.088 20.7835 19.088 21.2666 19.5679Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <input
                    className={styles.header__search}
                    type="text"
                    name="search"
                    placeholder={lang === "ru" ? "Поиск" : "Qidiruv"}
                  />
                </div>
              </li>
              <li className={styles.header__item}>
                <label className={styles.select}>
                  <select
                    onChange={(evt) => handleLangChange(evt.target.value)}
                  >
                    <option value="ru" defaultChecked>
                      Ru
                    </option>
                    <option value="uz">Uz</option>
                  </select>
                </label>
              </li>
              <li className={styles.header__item}>
                <div>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    id="checkbox"
                    checked={themeList}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="checkbox"
                    className={`${styles.label} ${
                      themeList ? "day-mode" : "night-mode"
                    }`}
                  >
                    <i className="fas fa-moon"></i>
                    <i className="fas fa-sun"></i>
                    <div className={styles.ball} />
                  </label>
                </div>
              </li>
              <li className={styles.header__item}>
                {phoneInsta?.map((el) => {
                  return (
                    <div className={styles.header__linkList} key={el._id}>
                      <a
                        className={styles.header__tel}
                        href={`tel:+998${el.number}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={25}
                          hanging={25}
                          viewBox="0 0 122.88 122.27"
                          fill="currentColor"
                        >
                          <path
                            fill="currentColor"
                            d="M33.84 50.25c4.13 7.45 8.89 14.6 15.07 21.12C55.11 77.93 62.82 83.9 72.8 89c.74.36 1.44.36 2.07.11.95-.36 1.92-1.15 2.87-2.1.74-.74 1.66-1.92 2.62-3.21 3.84-5.05 8.59-11.32 15.3-8.18.15.07.26.15.41.21l22.38 12.87c.07.04.15.11.21.15 2.95 2.03 4.17 5.16 4.2 8.71 0 3.61-1.33 7.67-3.28 11.1-2.58 4.53-6.38 7.53-10.76 9.51-4.17 1.92-8.81 2.95-13.27 3.61-7 1.03-13.56.37-20.27-1.69-6.56-2.03-13.17-5.38-20.39-9.84l-.53-.34c-3.31-2.07-6.89-4.28-10.4-6.89-12.84-9.7-25.93-23.71-34.46-39.13C2.35 50.95-1.55 36.98.58 23.67c1.18-7.3 4.31-13.94 9.77-18.32C15.11 1.51 21.52-.59 29.82.15c.95.07 1.8.62 2.25 1.44l14.35 24.26c2.1 2.72 2.36 5.42 1.21 8.12-.95 2.21-2.87 4.25-5.49 6.15-.77.66-1.69 1.33-2.66 2.03-3.21 2.33-6.86 5.02-5.61 8.18l-.03-.08z"
                          />
                        </svg>
                      </a>
                      <a
                        className={styles.header__insta}
                        href={el.instagram}
                        target="blank"
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
                    </div>
                  );
                })}
              </li>
            </ul>

            <div className={styles.mobile}>
              <MenuButton open={menuOpen} onClick={handleMenuClick} />
            </div>
          </div>
          <nav>
            <Menu open={menuOpen}>{menuItems}</Menu>
          </nav>
        </div>
      </header>
    </>
  );
});

export default Header;
