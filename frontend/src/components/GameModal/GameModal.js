import { Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CurUserContext from "../../store/curUser-context";
import classes from "./GameModal.module.scss";
const GameModal = ({ landData }) => {
  const curUserCtx = useContext(CurUserContext);
  const [isMyLand, setIsMyLand] = useState(
    curUserCtx.user.id === landData.owner
  );

  const sxClasses = {
    marginRight: "auto",
    maxWidth: "200px",
  };

  useEffect(() => {}, []);

  return (
    <Container className={classes["container"]}>
      <h3 className={classes["header"]}>
        {landData.innerData ? landData.innerData.name : "No Game"}
      </h3>
      {landData.innerData ? (
        <iframe className={classes["frame"]} src={landData.innerData.gameUrl} />
      ) : (
        ""
      )}
    </Container>
  );
};

export default GameModal;
