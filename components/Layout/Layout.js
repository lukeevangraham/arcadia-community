import Toolbar from "../Navigation/Toolbar/Toolbar";
import Header from "../Home/Header/Header";

import classes from "./Layout.module.scss";

const Layout = ({ children, homeHeaderImage }) => (
  <>
    {homeHeaderImage ? (
      <Header homeHeaderImage={homeHeaderImage}>
        <Toolbar />
      </Header>
    ) : (
      <Toolbar />
    )}
    {children}
  </>
);

export default Layout;
