import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { buyLand, updateLand } from "../../helpers/landHelper";
import { changeUserBalance } from "../../helpers/userHelper";
import CurUserContext from "../../store/curUser-context";
import GameModal from "../GameModal/GameModal";
import MUIModal from "../Modal/MUIModal";
import classes from "./LandModalInfo.module.scss";
const LandModalInfo = ({
  landData,
  onClose,
  handleGameModalOpen,
  refreshMap,
  setUser,
}) => {
  const curUserCtx = useContext(CurUserContext);
  const [isMyLand, setIsMyLand] = useState(
    curUserCtx.user.id === landData.owner
  );
  const [landOwner, setLandOwner] = useState("");
  const [price, setPrice] = useState("");
  const [forSale, setForSale] = useState(true);
  const [game, setGame] = useState({ name: "" });
  // const [showModal, setShowModal] = useState(false);

  // const handleModalOpen = useCallback(() => {
  //   setShowModal(true);
  // }, []);

  // const handleModalClose = useCallback(() => {
  //   setShowModal(false);
  // }, []);

  const sxClasses = {
    marginRight: "auto",
    maxWidth: "200px",
  };

  useEffect(() => {
    setPrice(landData.price);
    setForSale(landData.forSale);
    setGame(landData.innerData);
  }, [landData]);

  useEffect(() => {
    if (landData.owner !== null && landData.owner.length > 0) {
      (async () => {
        const landUser = await fetch(
          `http://127.0.0.1:5000/user/get?id=${landData.owner}`
        )
          .then(async (user) => {
            setLandOwner(await user.json());
          })
          .catch((err) => {
            console.log(err);
          });
      })();
    }
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (curUserCtx.user.balance < landData.price) {
      alert("You don't have enough money to buy this land");
      return;
    }
    if (landData.owner != "") {
      const userBalanceRes = await changeUserBalance(
        landData.owner,
        landData.id,
        landData.price,
        "add"
      );
    }
    const res = await updateLand(landData.id, {
      ...landData,
      owner: curUserCtx.user.id,
      isOcupied: true,
    });
    const userBalanceRes = await changeUserBalance(
      curUserCtx.user.id,
      landData.id,
      landData.price,
      "sub"
    );
    await refreshMap();
    await setUser();
  };
  const saveChangesHandler = async () => {
    const innerData = {};
    let gameUrl;
    if (game.name === "Numble") {
      innerData.name = game.name;
      innerData.gameUrl = "https://numble-ronen-badalov.netlify.app/";
    }
    if (game.name === "TicTacToe"){
      innerData.name = game.name;
      innerData.gameUrl = "https://toytheater.com/tic-tac-toe/";
    }
    if (game.name === "Flappy Bird") {
      innerData.name = game.name;
      innerData.gameUrl = "https://flappybird.io/";
    }

    const res = await updateLand(landData.id, {
      ...landData,
      price,
      forSale,
      innerData,
    });
    onClose();
    await refreshMap();
  };
  return (
    <div>
      <h3>Land {landData.id}</h3>
      <form onSubmit={formSubmitHandler}>
        <div className={classes["formContainer"]}>
          <div className={classes["formSection"]}>
            <TextField
              id="standard-basic"
              label="Owner"
              variant="standard"
              disabled={true}
              value={landOwner.name ? landOwner.name : "none"}
              sx={{ ...sxClasses }}
            />
            <FormControl sx={{ marginTop: 2, ...sxClasses }}>
              <InputLabel htmlFor="landPrice">Price</InputLabel>
              <Input
                id="landPrice"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                disabled={!isMyLand}
                label="Price"
              />
            </FormControl>
          </div>
          <div className={classes["formSection"]}>
            <FormControlLabel
              control={
                <Switch
                  checked={forSale}
                  onChange={(e) => {
                    setForSale(e.target.checked);
                  }}
                  disabled={!isMyLand}
                />
              }
              label="For Sale"
              // onChange={(e) => {
              //   // setForSale(e.target.value);
              //   console.log(e.target.value);
              // }}
              labelPlacement="start"
              sx={{ ...sxClasses }}
            />
            <FormControl disabled={!isMyLand}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Game
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={game.name ? game.name : ""}
                onChange={(e) => {
                  setGame({ name: e.target.value });
                }}
              >
                <FormControlLabel
                  value="Numble"
                  control={<Radio />}
                  label="Numble"
                />
                <FormControlLabel
                  value="TicTacToe"
                  control={<Radio />}
                  label="TicTacToe"
                />
                <FormControlLabel
                  value="Flappy Bird"
                  control={<Radio />}
                  label="Flappy Bird"
                />
                <FormControlLabel
                  defaultChecked = {true}
                  value=""
                  control={<Radio />}
                  label="No-Game"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={classes["btnSection"]}>
          <Button
            variant="contained"
            disabled={!game.url}
            onClick={handleGameModalOpen}
          >
            Play Game!
          </Button>
          {!isMyLand && (
            <Button
              variant="contained"
              disabled={!landData.forSale}
              type="submit"
            >
              Buy
            </Button>
          )}
          {isMyLand && (
            <Button variant="contained" onClick={saveChangesHandler}>
              Save Changes
            </Button>
          )}
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LandModalInfo;
