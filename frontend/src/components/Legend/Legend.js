import React from "react";
import classes from "./Legend.module.scss";
import LegendItem from "./LegendItem";

const Legend = () => {
  return (
    <div className={classes["legend"]}>
      <LegendItem color="blue" text="Unowned - for sale" />
      <LegendItem color="red" text="Not for sale" />
      <LegendItem color="orange" text="My land - for sale" />
      <LegendItem color="yellow" text="My land - not for sale" />
      <LegendItem color="purple" text="Owned By Others" />
      <LegendItem color="gray" text="Road" />
      <LegendItem color="green" text="Park" />
    </div>
  );
};

export default Legend;
