import React from 'react';
import {ROUTE} from "../../constants";
import {Link} from "react-router-dom";
import './style.css';

class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="header-area header-area--default">
          <header className="header-area header-sticky">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 d-flex align-items-center">
                  <div className="header__logo">
                    <div style={{width: '50px'}} className="logo">
                      <Link style={{width: '100%'}} to={ROUTE.HOME}><img style={{width: '100%'}} src="../images/pp.jpeg" alt=""/></Link>
                    </div>
                  </div>
                  <div className="header-right">
                    <div className="header__navigation menu-style-three d-none d-lg-block">
                      {/*<nav className="navigation-menu">*/}
                      {/*  <ul>*/}
                      {/*    <li className="has-children has-children--multilevel-submenu active">*/}
                      {/*      <a href="#"><span>Home</span></a>*/}
                      {/*      <ul className="submenu">*/}
                      {/*        <li className="active"><a href="index.html"><span>Home One</span></a></li>*/}
                      {/*        <li><a href="index-2.html"><span>Home Two</span></a></li>*/}
                      {/*        <li><a href="index-3.html"><span>Home Three</span></a></li>*/}
                      {/*        <li><a href="index-4.html"><span>Home Four</span></a></li>*/}
                      {/*      </ul>*/}
                      {/*    </li>*/}
                      {/*    <li className="has-children">*/}
                      {/*      <a href="about-us.html"><span>About</span></a>*/}
                      {/*    </li>*/}
                      {/*    <li className="has-children">*/}
                      {/*      <a href="events.html"><span>Event</span></a>*/}
                      {/*    </li>*/}
                      {/*    <li className="has-children has-children--multilevel-submenu">*/}
                      {/*      <a href="service.html"><span>Services</span></a>*/}
                      {/*    </li>*/}

                      {/*    <li className="has-children"><a href="causes.html"><span>Causes</span></a></li>*/}
                      {/*    <li className="has-children has-children--multilevel-submenu">*/}
                      {/*      <a href="#"><span>Pages</span></a>*/}
                      {/*      <ul className="submenu">*/}
                      {/*        <li><a href="donation.html"><span>Donation</span></a></li>*/}
                      {/*        <li><a href="gallery.html"><span>Gallery</span></a></li>*/}
                      {/*        <li><a href="mission-and-vision.html"><span>Mission & Vision</span></a></li>*/}
                      {/*        <li><a href="causes-details.html"><span>Causes Details</span></a></li>*/}
                      {/*        <li><a href="events-details.html"><span>Events Details</span></a></li>*/}
                      {/*      </ul>*/}
                      {/*    </li>*/}
                      {/*    <li className="has-children">*/}
                      {/*      <a href="contact-us.html"><span>Contact</span></a>*/}
                      {/*    </li>*/}

                      {/*  </ul>*/}
                      {/*</nav>*/}

                    </div>

                    <div className="header-btn text-right d-none d-sm-block ml-lg-4">
                      <Link to={ROUTE.LOGIN} className="btn-circle btn-default btn">Login</Link>
                    </div>

                    <div className="mobile-navigation-icon d-block d-lg-none" id="mobile-menu-trigger">
                      <i/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

        </div>
        <div className="site-wrapper-reveal">
          <div className="hero-area bg-overlay-black  hero-style-01 hindu-hero-bg">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hero-content text-center">
                    <h1 className="text-white">COASTOK</h1>
                    <h4 className="text-white">Connect A Soul To Krishna</h4>
                    <div className="ht-btn-area hero-boder-top">
                      <Link to={ROUTE.DASHBOARD} className="hero-btn">Dashboard</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;