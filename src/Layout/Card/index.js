import React from "react";
import CardWrapper from "./Card.style";

const Card = (props) => {
  return <CardWrapper {...props}>{props.children}</CardWrapper>;
};

export default Card;
