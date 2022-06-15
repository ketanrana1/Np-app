
import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
    <header>
          <div className="top-bar"><h2 className="px-1">Logo</h2></div>
    </header>
    <div className="content-cont row">
      <div className="col-2 px-0">
      <MainNavigation />
      </div>
      <div className="col-12 col-md-10 px-5 main-body-cont">
      <main>{props.children}</main>
      </div>
    </div> 
    </Fragment>
  );
};

export default Layout;