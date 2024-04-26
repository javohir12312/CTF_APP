import React, { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import style from "./Search.module.scss";
import "./Mobile.css";
import { Link } from "react-router-dom";
import { Forimage } from "../../server/api";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import { Empty } from "antd";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
const elBody = document.getElementById("root");

const Header = React.memo(() => {
  const { logoList } = useSelector((state) => state.logo);
  const { userList } = useSelector((state) => state.user);
  const { themeList } = useSelector((state) => state.theme);
  const { lang } = useSelector((state) => state.lang);
  const { phoneInsta } = useSelector((state) => state.phoneInsta);
  const [scroll, setScroll] = useState(false);
  const [value, setValue] = useState([]);
  const inputRef = useRef(null);
  const [hasFocus, setHasFocus] = useState(false);

  const filtered = userList.filter((el) =>
    el[lang].firstname.toLowerCase().includes(value)
  );

  const handleFocus = () => {
    const mobileSearch = document.getElementById("search");
    mobileSearch.classList.add("openSearch");
    setHasFocus(true);
    setScroll(!scroll);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setScroll(!scroll);
      const mobileSearch = document.getElementById("search");
      mobileSearch.classList.remove("openSearch");
      setHasFocus(false);
      setValue("");
    }, 90);
  };

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

  useEffect(() => {
    handleLinkClick();
  }, [themeList, lang]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    setScroll(!scroll);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setScroll(false);
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
        <Link
          className={styles.header__link}
          to={"about"}
          onClick={handleLinkClick}
        >
          {lang === "ru" ? "O нас" : "Biz haqimizda"}{" "}
          <span className={styles.link__line}></span>
        </Link>
      </li>
      <li className={styles.header__item}>
        {phoneInsta?.map((el) => {
          return (
            <div className={styles.header__linkList} key={el._id}>
              <LangToggle />
              <ThemeToggle />
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
                      src={`${Forimage}${el.dark }`}
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
                <Link className={styles.header__link} to={"about"}>
                  {lang === "ru" ? "O нас" : "Biz haqimizda"}{" "}
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
                    type="search"
                    autoComplete="off"
                    ref={inputRef}
                    name="search"
                    placeholder={lang === "ru" ? "Поиск" : "Qidiruv"}
                    value={value}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(evt) => setValue(evt.target.value)}
                  />

                  {hasFocus ? (
                    <div
                      className={themeList ? style.search : style.searchDark}
                    >
                      <h3 className={style.title}>
                        {lang === "ru" ? "Полученные результаты" : "Natijalar"}
                      </h3>
                      {value.length !== 0 ? (
                        filtered.map((el) => {
                          return (
                            <Link
                              className={style.link}
                              to={`/${el._id}`}
                              key={el._id}
                            >
                              <p className={style.firstname}>
                                {el[lang].firstname} {el[lang].lastname}
                              </p>
                              <div className={style.icons}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  fill="currentColor"
                                >
                                  <path
                                    d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </div>
                            </Link>
                          );
                        })
                      ) : (
                        <Empty />
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </li>

              <li className={styles.header__item}>
                {phoneInsta?.map((el) => {
                  return (
                    <div className={styles.header__linkList} key={el._id}>
                      <LangToggle />
                      <ThemeToggle />
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

        <div
          className={
            themeList ? style.search__mobile : style.search__mobileDark
          }
          id="search"
        >
          <div className={style.search__box}>
            <div
              className={`${style.arrowLeft} ${
                hasFocus ? style.arrowAcktive : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="26"
                fill="currentColor"
              >
                <path
                  fill="currentColor"
                  d="m12.885.58 2.084 2.084L4.133 13.5l10.836 10.836-2.084 2.084L2.049 15.584-.035 13.5z"
                />
              </svg>
            </div>
            <div className={style.header__searchIcon}>
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
              className={style.header__search}
              type="search"
              autoComplete="off"
              ref={inputRef}
              name="search"
              placeholder={lang === "ru" ? "Поиск" : "Qidiruv"}
              value={value}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(evt) => setValue(evt.target.value.toLowerCase())}
            />

            {hasFocus ? (
              <div className={themeList ? style.search : style.searchDark}>
                <h3 className={style.title}>
                  {lang === "ru" ? "Полученные результаты" : "Natijalar"}
                </h3>
                {value.length !== 0 ? (
                  filtered.map((el) => {
                    return (
                      <Link
                        className={style.link}
                        to={`/${el._id}`}
                        key={el._id}
                      >
                        <p className={style.firstname}>
                          {el[lang].firstname} {el[lang].lastname}
                        </p>
                        <div className={style.icons}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                          >
                            <path
                              d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <Empty
                    className="h-[80%] flex flex-col items-center justify-center"
                    description={
                      <span
                        className={
                          themeList ? "text-[#403D39]" : "text-[#ced4da]"
                        }
                      >
                        {lang === "ru" ? "Нет данных" : "Maʼlumot yoʻq"}
                      </span>
                    }
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </header>
    </>
  );
});

export default Header;
