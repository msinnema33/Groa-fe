import React from "react";
import ReactLoading from "react-loading";
import { ifDev } from "../../utils/removeAttribute.js";
import "./_LoadingScreen.scss";

export default function LoadingScreen() {
  return (
    <div
      className="container loading-screen"
      data-test={ifDev("loading-screen-component")}
    >
      <h4>Loading Recommendations</h4>
      <ReactLoading
        className="loading-component"
        data-test={ifDev("loading-object")}
        type={"spinningBubbles"}
        color={"#146ce0"}
        height={"200px"}
        width={"200px"}
      />
    </div>
  );
}
