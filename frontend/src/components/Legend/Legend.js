import React, { useEffect, useState } from "react";
import { getMapFromCache } from "../../helpers/landHelper";
import { getAllUsers } from "../../helpers/userHelper";
import classes from "./Legend.module.scss";
import LegendItem from "./LegendItem";

const Legend = (props) => {
  const [gameCount, setGameCount] = useState(0);
  const user = props.currentUser;
  const [allUsersArr, setAllUsersArr] = useState([]);
  const map = getMapFromCache();

  useEffect(() => {
    (async () => {
      setAllUsersArr(await getAllUsers());
    })();
    let gameCounter = 0;
    for(const row of map) {
      for(const land of row) {
        if(user.ownLands.includes("" + land.id)) {
          if(land.innerData.name) gameCounter++;
        }
      }
    }
    setGameCount(gameCounter);
  }, []);

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className={classes["legend"]}>
          <LegendItem color="blue" text="Unowned" />
          <LegendItem color="orange" text="My land - for sale" />
          <LegendItem color="yellow" text="My land - not for sale" />
          <LegendItem color="purple" text="For sale" />
          <LegendItem color="red" text="Not for sale" />
          <LegendItem color="gray" text="Road" />
          <LegendItem color="green" text="Park" />
        </div>
            <div style={{marginTop: '10px'}}>
            <h3 style={{textDecoration: 'underline'}}>Statistics</h3>
            <span>My Total Lands: <strong>{user.ownLands.length}</strong></span><br />
            <span>My Total Games in Lands: <strong>{gameCount}</strong></span>
            <br />
            <br />
            <span>Total Users: <strong>{allUsersArr.length}</strong></span>


        </div>
      </div>
    </>
  );
};

export default Legend;
