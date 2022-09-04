import React from "react";
import ImageWrapper from "./Image.style";

const Image = (props) => {
  return (
    <ImageWrapper {...props} loading="lazy">
      {props.children}
    </ImageWrapper>
  );
};

export default Image;
