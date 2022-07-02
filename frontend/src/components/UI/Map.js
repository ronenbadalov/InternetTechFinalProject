import React, { useEffect, useState } from "react";
import Land from "./Land";
import classes from "./Map.module.scss";
import { Container, Row, Col } from "react-bootstrap";

const getMap = async () => {
  try {
    const res = await fetch("http://127.0.0.1:5000/land/getAll");
    if (!res.ok) throw new Error("error while fetching map");
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

const Map = () => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem("map")) {
      (async () => {
        const arr = await getMap();
        const sortedArr = arr.sort((a, b) => +a.id - +b.id);
        const newArr = [];
        while (sortedArr.length) newArr.push(sortedArr.splice(0, 100));
        setMapData(newArr);
        sessionStorage.setItem("map", JSON.stringify(newArr));
      })();
    } else {
      setMapData(JSON.parse(sessionStorage.getItem("map")));
    }
  }, []);

  return (
    <div className={classes["container"]} style={{ margin: "30px" }}>
      {mapData.map((row, i) => {
        return (
          <Row className={classes["row"]} key={i} xs={"auto"}>
            {row.map((land) => {
              return (
                <Col key={land.id} className="p-0 m-0">
                  <Land
                    id={land.id}
                    type={land.type}
                    price={land.price}
                    owner={land.owner}
                    disabled={land.disabled}
                  />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};

export default Map;

// const paintRowRoad = async (startId) =>{
//   for(let i=startId;i<startId+10000;i=i+100){
//       const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//           method: "PUT",
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({id:i,type:'road_land', disabled:true, forSale: false })})
//       const data = await res.json()
//   }}
// await paintRowRoad(49)

// const paintColumnRoad = async (startId) =>{
//   for(let i=startId;i<startId+100;i++){
//       const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//           method: "PUT",
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({id:i,type:'road_land', disabled:true, forSale: false })})
//       const data = await res.json()
//   }}

// await paintColumnRoad(4900)

// const paintSquarePark = async (startId) =>{
//   for(let i=startId;i<startId+1900;i=i+100){
//       const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//           method: "PUT",
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({id:i,type:'park_land', disabled:true, forSale: false })})
//       const data = await res.json()
//   }}

// const data = JSON.parse(sessionStorage.map)
// const arr=[]
// data.forEach(row =>{ row.forEach(land =>{if(land.type==="land")arr.push(land)})})
// const rand = () => {
//   const min = Math.ceil(15);
//   const max = Math.floor(200);
//   return Math.floor(Math.random() * (max - min) + min);
// };
// arr.forEach(async (land)=>{
//         const res = await fetch(`http://127.0.0.1:5000/land/updateLand`,{
//             method: "PUT",
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({id:land.id,price:rand(),innerData:{}})})
//        })
