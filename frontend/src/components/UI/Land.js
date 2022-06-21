import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import classes from "./Land.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Land = (props) => {
  // const classesStr = `${classes["land"]} ${classes[props.type]} ${
  //   ["unowned", "owned", "owned-forSale"].includes(classes[props.type])
  //     ? classes["clickable"]
  //     : classes["unClickable"]
  // }`;
  const [classColor, setClassColor] = useState("");

  useEffect(() => {
    switch (props.type) {
      case "land":
        setClassColor("primary");
        break;
      case "road_land":
        setClassColor("secondary");
        break;
      case "park_land":
        setClassColor("success");
        break;
    }
  }, []);
  return (
    <>
      {/* <Popup
        trigger={
          <Button
            className={`w-100 h-100 rounded-0`}
            variant={"primary"}
            style={{
              outline: "1px solid black",
              boxShadow: "none",
            }}
            id={props.id}
            key={props.id}
          ></Button>
        }
        position="right top"
      > */}
      {/* <LandPopUp id={props.id} hexId={hexId} contract={props.contract} dispatch={dispatch} account={props.accounts} price={land.price} isOwned1={land.isOwned} ></LandPopUp> */}
      {/* </Popup> */}
      <Button
        variant={classColor}
        className="rounded-0 p-0"
        style={{
          outline: "1px solid black",
          boxShadow: "none",
          fontSize: "8px",
          width: "30px",
          height: "30px",
        }}
        id={props.id}
        key={props.id}
        disabled={props.disabled}
      >
        {props.price}
      </Button>
    </>
  );
};

export default Land;
