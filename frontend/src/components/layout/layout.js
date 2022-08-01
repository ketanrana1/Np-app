
import { Fragment } from 'react';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (

    <Fragment>
    <header className="top-bar d-flex align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 d-flex justify-content-center">
              <h2 className="px-1">Logo</h2>
          </div>
          <div className="col-md-10">
          </div>
        </div>
      </div>

    </header>
    <div className="content-cont container-fluid">
      <div className="content-cont-wrapper">
        <div className="content-sidebar-wrapper">
          <MainNavigation />
        </div>
        <div className="content-right-wrapper">
          <main>{props.children}</main>
        </div>
      </div>
    </div> 
    </Fragment>
  );
};

export default Layout;