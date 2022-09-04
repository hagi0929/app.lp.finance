import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import styled from "styled-components";

const FooterWrapper = styled.div`
  min-height: calc(100vh - 259px);
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <FooterWrapper>{children}</FooterWrapper>
      <Footer />
    </>
  );
};

export default Layout;
