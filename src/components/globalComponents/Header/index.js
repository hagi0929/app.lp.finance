import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavbarRegistry, NavbarMobileRegistry } from "assets/registry";
import { WalletMultiButton } from "lib/WalletAdapter";
import HeaderWrapper from "./Header.style";
import { RpcRegistry } from "assets/registry";
import { useCluster } from "contexts/ClusterContext";
import Button from "Layout/Button";

const Header = () => {
  const { Cluster, changeCluster } = useCluster();
  const [dropdown, setDropdown] = useState(false);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[1].tagName !== "BUTTON") {
        setDropdown(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);
    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <>
      <HeaderWrapper>
        <div id="mySidenav" className="sideNav mb-4">
          <div className="container-fluid">
            <div className="row d-flex align-items-center mt-2">
              <div className="col-8 d-flex justify-content-center">
                <img
                  src="/images/Logo.png"
                  alt="Loading..."
                  className="small_logo"
                />
              </div>
              <div className="col-4 d-flex justify-content-end">
                <p className="closeBtn mr-2" onClick={closeNav}>
                  <i className="zmdi zmdi-close close_icon" />
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex justify-content-start">
                <ul className="mt-5 ml-3 pl-1">
                  {NavbarMobileRegistry.map((nav) => {
                    return (
                      <li key={nav.id}>
                        {nav.name === "Setting" ? (
                          <p>{nav.name}</p>
                        ) : (
                          <NavLink to={nav.href} onClick={closeNav}>
                            {nav.name}
                          </NavLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="Wallet">
              <WalletMultiButton />
            </div>
          </div>
        </div>

        <div className="container navbar_component">
          <div className="row">
            <div className="col-12">
              <nav className="navbar navbar-light">
                <i className="zmdi zmdi-menu navbar-icon" onClick={openNav} />

                <NavLink to="/" className="navbar-brand mb-2 ml-3">
                  <img src="/images/Logo.png" alt="Loading..." />
                </NavLink>

                <ul className="navbar-nav left_ui_block ml-auto d-flex justify-content-center  align-items-center flex-row">
                  {NavbarRegistry.map((nav) => {
                    return (
                      <li className="nav-item" key={nav.id}>
                        <NavLink
                          exact="true"
                          to={nav.href}
                          className="nav-link"
                          activeclassname="active"
                        >
                          {nav.name}
                        </NavLink>
                      </li>
                    );
                  })}

                  <li className="nav-item">
                    <div className="Wallet_section">
                      <WalletMultiButton />
                    </div>
                  </li>
                </ul>

                <ul className="navbar-nav setting_section d-flex justify-content-center  align-items-center flex-row">
                  <div className={dropdown ? "btn-group show" : "btn-group"}>
                    <Button
                      type="button"
                      className="dropdown_btn"
                      data-display="static"
                      aria-expanded="false"
                      onClick={() => setDropdown((prev) => !prev)}
                    >
                      <i className="zmdi zmdi-settings setting"></i>
                    </Button>
                    <div
                      className={
                        dropdown
                          ? "dropdown-menu dropdown-menu-right show"
                          : "dropdown-menu dropdown-menu-right"
                      }
                    >
                      <div className="dropdown-item">
                        <div className="title">
                          <p>Settings</p>
                        </div>
                        <div className="title mt-3">
                          <span>Networks -</span>
                        </div>
                        {RpcRegistry.map((list) => {
                          return (
                            <div
                              className="networks_card mt-2"
                              key={list.id}
                              onClick={() => changeCluster(list.network)}
                            >
                              <div className="name">
                                <p>{list.network}</p>
                              </div>
                              {list.network === Cluster && (
                                <div className="checked">
                                  <i className="zmdi zmdi-check" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </HeaderWrapper>
    </>
  );
};

export default Header;
