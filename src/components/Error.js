import React from "react";

import "./Error.scss";
const Error = (props) => {
  return (
    <div className="error">
      <h1>Error Occured !!</h1>
      <div>{props.message}</div>
    </div>
  );
};

export default Error;
