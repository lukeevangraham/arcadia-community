import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import classes from "./SearchBar.module.scss";
import classNames from "classnames";

const SearchBar = ({ open, home }) => {
  const inputRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { keyword: searchTerm },
    });
  };

  open ? inputRef.current.focus() : null;

  return (
    <div
      className={classNames(classes.SearchBar, {
        [classes.SearchBar__Open]: open,
        [classes.SearchBar__NoBg]: home,
      })}
    >
      <div className="row">
        <form className={classes.SearchBar__Form} onSubmit={handleSubmit}>
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
            className={classes.SearchBar__Form_SearchButton}
            onClick={handleSubmit}
          >
            <svg>
              <use xlinkHref="/images/sprite.svg#icon-magnifying-glass"></use>
            </svg>
          </div>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
