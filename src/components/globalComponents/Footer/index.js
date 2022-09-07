import { useEffect } from "react";
import { FooterRegistry } from "assets/registry";
import FooterWrapper from "./Footer.style";
import Image from "Layout/Image";

const Footer = () => {
  useEffect(() => {
    var newDate = new Date();
    let year = newDate.getFullYear();
    document.getElementById("year").innerHTML = `${year} by LP Finance Inc.`;
  }, []);

  return (
    <>
      <FooterWrapper>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row d-flex align-items-center top_section">
                  <div className="col-lg-2 col-md-2 col-sm-3 col-12">
                    <div className="footer_logo ">
                      <img
                        src="/images/Logo.png"
                        alt="Loading..."
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="col-4 col-md-10 col-sm-9 col-12 mt-lg-0 mt-md-0 mt-2 d-flex justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center">
                    <ul className="navbar-nav footer_icons  d-flex flex-row ">
                      {FooterRegistry.map((items) => {
                        return (
                          <li className="nav-item" key={items.id}>
                            <a
                              href={items.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Image
                                src={items.icon}
                                alt={items.name}
                                h="1.8rem"
                              />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="row bottom_section">
                  <div className="col-12 d-flex justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center">
                    <div className="copyright text-center">
                      <p id="year"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </FooterWrapper>
    </>
  );
};

export default Footer;
