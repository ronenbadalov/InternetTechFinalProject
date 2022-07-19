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
import { buyLand } from "../../helpers/landHelper";
import { changeUserBalance } from "../../helpers/userHelper";
import CurUserContext from "../../store/curUser-context";
import GameModal from "../GameModal/GameModal";
import MUIModal from "../Modal/MUIModal";
import classes from "./LandModalInfo.module.scss";
const LandModalInfo = ({ landData, onClose, handleGameModalOpen }) => {
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
    const res = await buyLand(landData.id, curUserCtx.user.id, landData.price, {
      owner: curUserCtx.user.id,
      isOcupied: true,
    });
    const userBalanceRes = await changeUserBalance(
      curUserCtx.user.id,
      landData.price
    );
  };
  const saveChangesHandler = () => {
    console.log("changes saved");
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
                // onChange={handleChange('amount')}
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
              control={<Switch checked={forSale} disabled={!isMyLand} />}
              label="For Sale"
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
                  value="Game3"
                  control={<Radio />}
                  label="Game3"
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
