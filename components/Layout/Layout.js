import Toolbar from "../Navigation/Toolbar/Toolbar";
import Header from "../Home/Header/Header";

import classes from "./Layout.module.scss";

const Layout = ({ children, homeHeaderImage, globalData }) => (
  <>
    {homeHeaderImage ? (
      <Header homeHeaderImage={homeHeaderImage}>
        {console.log("GLOBAL: ", globalData)}
        <Toolbar globalData={globalData} />
      </Header>
    ) : (
      <Toolbar globalData={globalData} />
    )}
    {children}
  </>
);

export default Layout;
