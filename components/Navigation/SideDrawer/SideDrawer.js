import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import Brandname from "../../UI/Brandname/Brandname";

import classes from "./SideDrawer.module.scss";

const SideDrawer = ({ open, closed, globalData, searchClicked }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { keyword: searchTerm },
    });
    closed()
  };

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div
        className={
          open
            ? `${classes.SideDrawer} ${classes.SideDrawer__open}`
            : `${classes.SideDrawer} ${classes.SideDrawer__closed}`
        }
      >
        <Link href="/">
          <a style={{ display: "flex" }}>
            <div className={classes.SideDrawer__logo}>
              <Image
                src={globalData.data.attributes.Navbar.logo.data.attributes.url}
                alt={
                  globalData.data.attributes.Navbar.logo.data.attributes
                    .alternativeText
                }
                layout="fill"
              />
            </div>
            <div className={classes.SideDrawer__name}>
              <Brandname />
            </div>
          </a>
        </Link>
        <div className={classes.SideDrawer__search}>
          <form className={classes.SideDrawer__search__Form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="searchTerm"
              id="searchTerm"
              placeholder="Search"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              ref={inputRef}
            />
            {/* <Link href={{ pathname: "/search", query: { keyword: searchTerm } }}> */}
            <div
              className={classes.SideDrawer__search__Form_SearchButton}
              onClick={handleSubmit}
            >
              <svg>
                <use xlinkHref="/images/sprite.svg#icon-magnifying-glass"></use>
              </svg>
            </div>
            {/* </Link> */}
          </form>
        </div>
        <NavigationItems
          links={globalData.data.attributes.Navbar.links}
          button={globalData.data.attributes.Navbar.button}
          searchClicked={searchClicked}
          fromSideDrawer
        />
        {/* {globalData.data.attributes.Navbar.links.map((navLink) => (
        <div>{navLink.text}</div>
      ))} */}
      </div>
    </>
  );
};

export default SideDrawer;
