//@flow
import React from "react";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";

const styles = {
  common: {
    height: "9.5px",
    width: "11px"
  },
  black: {
    fill: "black"
  }
};

function Lines({ classes, type }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 25.78"
      className={classnames(classes.common, classes[type])}
    >
      <title>lines_1</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Solid">
          <path
            id="Text"
            d="M0,25.78v-4H30v4Zm0-7.25v-4H23.51v4Zm0-7.25v-4H27.83v4ZM0,4V0H21.34V4Z"
          />
        </g>
      </g>
    </svg>
  );
}

export default withStyles(styles)(Lines);
