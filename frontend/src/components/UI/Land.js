import React, { memo, useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CurUserContext from "../../store/curUser-context";

const Land = (props) => {
  const [classColor, setClassColor] = useState("");
  const curUserCtx = useContext(CurUserContext);
  const currentUser = curUserCtx.user;

  useEffect(() => {
    if (props.id == 100) {
      console.log(props);
      console.log(currentUser);
    }
    switch (props.type) {
      case "land":
        if (props.isOcupied) {
          // console.log(props.owner);
          // console.log(currentUser);
          if (props.owner === currentUser?.id) {
            if (props.forSale) setClassColor("orange");
            else setClassColor("yellow");
          } else {
            if (props.forSale) setClassColor("purple");
            else setClassColor("red");
          }
        } else {
          setClassColor("blue");
        }
        break;
      case "road_land":
        setClassColor("gray");
        break;
      case "park_land":
        setClassColor("green");
        break;
    }
  }, []);

  const showLandDataInModal = () => {
    props.setLandModalData({
      id: props.id,
      type: props.type,
      price: props.price,
      owner: props.owner,
      forSale: props.forSale,
      innerData: props.innerData,
      isOcupied: props.isOcupied,
      disabled: props.disabled,
    });
    props.onClick();
  };

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
        onClick={showLandDataInModal}
      >
        {props.disabled ? "" : props.price}
      </Button>
    </>
  );
};

export default Land;
