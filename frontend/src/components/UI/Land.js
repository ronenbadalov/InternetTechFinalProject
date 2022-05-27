import React from "react";
import { Button } from "react-bootstrap";
import Popup from "reactjs-popup";
import classes from "./Land.module.scss";
const Land = (props) => {
  // const classesStr = `${classes["land"]} ${classes[props.type]} ${
  //   ["unowned", "owned", "owned-forSale"].includes(classes[props.type])
  //     ? classes["clickable"]
  //     : classes["unClickable"]
  // }`;
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
        variant="primary"
        style={{
          outline: "1px solid black",
          boxShadow: "none",
          width: "30px",
          height: "30px",
        }}
        id={props.id}
        key={props.id}
      ></Button>
    </>
  );
};

export default Land;
