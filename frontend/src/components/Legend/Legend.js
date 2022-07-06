import React from "react";
import classes from "./Legend.module.scss";

const Legend = () => {
  return (
    <div className={classes["legend"]}>
      <div className={classes["row"]}>
        owned - not for sale
        <div className={`${classes["boxColor"]} ${classes["yellow"]}`}></div>
      </div>
      <div className={classes["row"]}>
        owned - for sale
        <div className={`${classes["boxColor"]} ${classes["yellow"]}`}></div>
      </div>
    </div>
  );
};

export default Legend;
