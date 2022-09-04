import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorWrapper from "./Error.style";
import Button from "Layout/Button";

const Error = () => {
  const navigate = useNavigate();

  return (
    <ErrorWrapper>
      <div className="container Error_Page">
        <div className="Error">
          <div className="row d-flex justify-content-center my-lg-5 my-md-5 my-sm-5 mt-5">
            <div className="col-12 d-flex justify-content-center">
              <img src="/images/Status/404.png" alt="Loading..." />
            </div>
            <div className="col-lg-4 col-md-4 col-6 d-flex justify-content-center">
              <Button
                active={1}
                br="10px"
                p="0.5rem 0rem"
                id="btn"
                onClick={() => navigate(-1)}
              >
                Go back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ErrorWrapper>
  );
};

export default Error;
