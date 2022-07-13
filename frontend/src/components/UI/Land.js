import React, { memo, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Land = (props) => {
  const [classColor, setClassColor] = useState("");

  useEffect(() => {
    switch (props.type) {
      case "land":
        setClassColor("blue");
        break;
      case "road_land":
        setClassColor("gray");
        break;
      case "park_land":
        setClassColor("green");
        break;
    }
  }, []);
  return (
    <>
      <Button
        variant="link"
        className={`rounded-0 p-0 ${classColor}`}
        style={{
          outline: "1px solid black",
          boxShadow: "none",
          fontSize: "8px",
          width: "30px",
          height: "30px",
          borderColor: "transparent",
          color: "white",
          textDecoration: "none",
        }}
        id={props.id}
        key={props.id}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.disabled ? "" : props.price}
      </Button>
    </>
  );
};

export default memo(Land);
